<?php

namespace App\Controller\Backend;

use App\Entity\Travel;
use App\Entity\Traveler;
use App\Form\TravelerType;
use App\Form\SearchType;
use App\Services\User\Manager\UserManager;
use App\Repository\TravelerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

/**
 * @Route("/travelers")
 */
class TravelerController extends AbstractController
{
    /**
     * @var UserManager
     */
    private $manager;
    public function __construct(
        UserManager $manager
    ) {
        $this->manager = $manager;
    }
    /**
     * @Route("/", name="traveler_index", methods={"GET"})
     */
    public function index(TravelerRepository $travelerRepository): Response
    {
        return $this->render('backend/traveler/index.html.twig', ['travelers' => $travelerRepository->findAll()]);
    }
    /**
     * @Route("/travels/{id}", name="traveler_list",  methods={"GET","POST"})
     */
    public function list(Request $request, TravelerRepository $travelerRepository, Travel $travel): Response
    {

        $traveler = new Traveler();
        $form = $this->createFormBuilder($traveler)
            ->add('email', TextType::class)
            ->getForm();
        $form->handleRequest($request);
        $email = $form->get('email')->getData();
        return $this->render('backend/traveler/list.html.twig', ['travelers' => $travelerRepository->findBy(['email' => $email]), 'form' => $form->createView(), 'travel' => $travel]);
    }
    /**
     * @Route("/{id}/voyage/{idvoyage}", name="traveler_invite", methods={"GET"})
     */
    public function invite($id, $idvoyage, Request $request, TravelerRepository $travelerRepository): Response
    {

        $traveler = $this->getDoctrine()->getRepository(Traveler::class)->find($id);
        $travel = $this->getDoctrine()->getRepository(Travel::class)->find($idvoyage);
        $travel->addTraveler($traveler);
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($traveler);
        $entityManager->flush();
        if ($traveler) {
            dump($traveler);
            try {
                $this->manager->sendInvitationEmail($traveler, $travel);
            } catch (\Twig_Error_Loader $e) { } catch (\Twig_Error_Runtime $e) { } catch (\Twig_Error_Syntax $e) { }
        }

        $expenses = $travel->getExpenses();
        $totalExpenses = 0;

        foreach ($expenses as $expense) {
            $totalExpenses += $expense->getAmount();
        }

        $itinerariesNumber = $travel->getItineraries()->count();
        $folders = $travel->getFolders();
        $documentsNumber = 0;

        foreach ($folders as $folder) {
            $documentsNumber += $folder->getDocuments()->count();
        }

        return $this->render('backend/travel/show.html.twig', [
            'travel' => $travel, 'travelers' => $travel->getTravelers(), 'total' => $totalExpenses,
            'itinerariesNumber' => $itinerariesNumber, 'documentsNumber' => $documentsNumber
        ]);
    }
    /**
     * @Route("/{id}/voyage/{idvoyage}", name="traveler_renvoye", methods={"DELETE"})
     */
    public function renvoyerVoyageur($id, $idvoyage, Request $request, TravelerRepository $travelerRepository): Response
    {
        $traveler = $this->getDoctrine()->getRepository(Traveler::class)->find($id);
        $travel = $this->getDoctrine()->getRepository(Travel::class)->find($idvoyage);
        $travel->removeTraveler($traveler);
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($traveler);
        $entityManager->flush();

        $expenses = $travel->getExpenses();
        $totalExpenses = 0;

        foreach ($expenses as $expense) {
            $totalExpenses += $expense->getAmount();
        }

        $itinerariesNumber = $travel->getItineraries()->count();
        $folders = $travel->getFolders();
        $documentsNumber = 0;

        foreach ($folders as $folder) {
            $documentsNumber += $folder->getDocuments()->count();
        }

        return $this->render('backend/travel/show.html.twig', [
            'travel' => $travel, 'travelers' => $travel->getTravelers(), 'total' => $totalExpenses,
            'itinerariesNumber' => $itinerariesNumber, 'documentsNumber' => $documentsNumber
        ]);
    }

    /**
     * @Route("/new", name="traveler_new", methods={"GET","POST"})
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function new(Request $request, UserPasswordEncoderInterface $passwordEncoder): Response
    {
        $traveler = new Traveler();

        $form = $this->createForm(TravelerType::class, $traveler);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $password = $passwordEncoder->encodePassword($traveler, $traveler->getPassword());
            $traveler->setPassword($password);
            $traveler->setRoles(['ROLE_USER']);
            $file = $traveler->getImage();
            $fileName = md5(uniqid()) . '.' . $file->guessExtension();
            $file->move($this->getParameter('upload_directory'), $fileName);
            $traveler->setImage($fileName);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($traveler);
            $entityManager->flush();
            return $this->redirectToRoute('traveler_index');
        }
        return $this->render('backend/traveler/new.html.twig', [
            'traveler' => $traveler,
            'form' => $form->createView(),
        ]);
    }
    /**
     * @Route("/{id}/travel/{idvoyage}", name="traveler_show", methods={"GET"})
     */
    public function show(Traveler $traveler, $idvoyage): Response
    {
        $travel = $this->getDoctrine()->getRepository(Travel::class)->find($idvoyage);
        return $this->render('backend/traveler/show.html.twig', ['traveler' => $traveler, 'travels' => $traveler->getTravels(), 'travel' => $travel]);
    }

    /**
     * @Route("/{id}/edit", name="traveler_edit", methods={"GET","POST"})
     *  @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function edit(Request $request, Traveler $traveler, UserPasswordEncoderInterface $passwordEncoder): Response
    {

        $form = $this->createForm(TravelerType::class, $traveler);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $password = $passwordEncoder->encodePassword($traveler, $traveler->getPassword());
            $traveler->setPassword($password);
            $traveler->setRoles(['ROLE_USER']);
            $file = $traveler->getImage();
            $fileName = md5(uniqid()) . '.' . $file->guessExtension();
            $file->move($this->getParameter('upload_directory'), $fileName);
            $traveler->setImage($fileName);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($traveler);
            $entityManager->flush();
            return $this->redirectToRoute('traveler_index', ['id' => $traveler->getId(),]);
        }
        return $this->render('backend/traveler/edit.html.twig', [
            'traveler' => $traveler,
            'form' => $form->createView(),
        ]);
    }
    /**
     * @Route("/{id}", name="traveler_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Traveler $traveler): Response
    {
        if ($this->isCsrfTokenValid('delete' . $traveler->getId(), $request->request->get('_token'))) {

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($traveler);
            $entityManager->flush();
        }
        return $this->redirectToRoute('traveler_index');
    }
}
