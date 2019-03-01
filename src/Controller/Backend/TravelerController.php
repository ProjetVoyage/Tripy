<?php

namespace App\Controller\Backend;

use App\Entity\Traveler;
use App\Form\TravelerType;
use App\Repository\TravelerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;


/**
 * @Route("/travelers")
 */
class TravelerController extends AbstractController
{
    /**
     * @Route("/", name="traveler_index", methods={"GET"})
     */
    public function index(TravelerRepository $travelerRepository): Response
    {
        return $this->render('backend/traveler/index.html.twig', ['travelers' => $travelerRepository->findAll()]);
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
            $file=$traveler->getImage();
            $fileName= md5(uniqid()).'.'.$file->guessExtension();
            $file->move($this->getParameter('upload_directory'),$fileName);
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
     * @Route("/{id}", name="traveler_show", methods={"GET"})
     */
    public function show(Traveler $traveler): Response
    {
        return $this->render('backend/traveler/show.html.twig', ['traveler' => $traveler, 'travels'=>$traveler->getTravels()]);
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
            $file=$traveler->getImage();
            $fileName= md5(uniqid()).'.'.$file->guessExtension();
            $file->move($this->getParameter('upload_directory'),$fileName);
            $traveler->setImage($fileName);

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($traveler);
            $entityManager->flush();


            return $this->redirectToRoute('traveler_index', ['id' => $traveler->getId(), ]);
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
        if ($this->isCsrfTokenValid('delete'.$traveler->getId(), $request->request->get('_token'))) {
            
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($traveler);
            $entityManager->flush();
        }

        return $this->redirectToRoute('traveler_index');
    }
}
