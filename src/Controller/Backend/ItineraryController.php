<?php

namespace App\Controller\Backend;

use App\Entity\Itinerary;
use App\Entity\Travel;
use App\Form\ItineraryType;
use App\Repository\ItineraryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ItineraryController extends AbstractController
{
    /**
     * @Route("/itineraries/", name="itinerary_index", methods={"GET"})
     */
    public function index(ItineraryRepository $itineraryRepository): Response
    {
        return $this->render('backend/itinerary/index.html.twig', ['itineraries' => $itineraryRepository->findAll()]);
    }

    /**
     * @Route("/itineraries/travels/{id}/new", name="itinerary_new", methods={"GET","POST"})
     */
    public function new(Request $request, Travel $travel): Response
    {
        $itinerary = new Itinerary();
        $itinerary->setTravelId($travel);
        $form = $this->createForm(ItineraryType::class, $itinerary);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($itinerary);
            $entityManager->flush();

            return $this->redirectToRoute('itinerary_index');
        }

        return $this->render('backend/itinerary/new.html.twig', [
            'itinerary' => $itinerary,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/itineraries/{id}", name="itinerary_show", methods={"GET"})
     */
    public function show(Itinerary $itinerary): Response
    {
        return $this->render('backend/itinerary/show.html.twig', ['itinerary' => $itinerary]);
    }

    /**
     * @Route("/itineraries/{id}/edit", name="itinerary_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Itinerary $itinerary): Response
    {
        $form = $this->createForm(ItineraryType::class, $itinerary);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('itinerary_index', ['id' => $itinerary->getId()]);
        }

        return $this->render('backend/itinerary/edit.html.twig', [
            'itinerary' => $itinerary,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/itineraries/{id}", name="itinerary_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Itinerary $itinerary): Response
    {
        if ($this->isCsrfTokenValid('delete'.$itinerary->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($itinerary);
            $entityManager->flush();
        }

        return $this->redirectToRoute('itinerary_index');
    }
}
