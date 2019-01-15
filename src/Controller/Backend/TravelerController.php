<?php

namespace App\Controller\Backend;

use App\Entity\Traveler;
use App\Form\TravelerType;
use App\Repository\TravelerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

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
     */
    public function new(Request $request): Response
    {
        $traveler = new Traveler();
        $form = $this->createForm(TravelerType::class, $traveler);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
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
        return $this->render('backend/traveler/show.html.twig', ['traveler' => $traveler]);
    }

    /**
     * @Route("/{id}/edit", name="traveler_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Traveler $traveler): Response
    {
        $form = $this->createForm(TravelerType::class, $traveler);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('traveler_index', ['id' => $traveler->getId()]);
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
