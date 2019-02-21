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
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;



class ItineraryController extends AbstractController
{
    /**
     * @Route("/travels/{id}/itineraries/", name="itinerary_index", methods={"GET"})
     */
    public function index(Travel $travel, ItineraryRepository $itineraryRepository): Response
    {
        $itineraries = $itineraryRepository->findBy(
            ['travel' => $travel->getId()]
        );

        return $this->render('backend/itinerary/index.html.twig', ['itineraries' => $itineraries, 'travel' => $travel]);
    }

    /**
     * @Route("/travels/{id}/itineraries/new", name="itinerary_new", methods={"GET","POST"})
     */
    public function new(Request $request, Travel $travel): Response
    {
        $itinerary = new Itinerary();
        $itinerary->setTravel($travel);
        $form = $this->createForm(ItineraryType::class, $itinerary);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($itinerary);
            $entityManager->flush();
            
            return $this->redirectToRoute('itinerary_index', ['id' => $travel->getId()]);
        }

        return $this->render('backend/itinerary/new.html.twig', [
            'itinerary' => $itinerary,
            'form' => $form->createView(),
            'travel' => $travel
        ]);
    }

    /**
     * @Route("/itineraries/{id}", name="itinerary_show", methods={"GET"})
     */
    public function show(Itinerary $itinerary): Response
    {
        return $this->render('backend/itinerary/show.html.twig', ['itinerary' => $itinerary, 'travel' => $itinerary->getTravel()]);
    }

    /**
     * @Route("/itineraries/{id}/edit", name="itinerary_edit", methods={"GET","POST"})
     * 
     */
    public function edit(Request $request, Itinerary $itinerary): Response
    {
        $form = $this->createForm(ItineraryType::class, $itinerary);
        $form->handleRequest($request);
        
        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();
            return $this->redirectToRoute('itinerary_edit', ['id' => $itinerary->getId(), 'travel' => $itinerary->getTravel()]);
        }

        return $this->render('backend/itinerary/edit.html.twig', [
            'itinerary' => $itinerary,
            'form' => $form->createView(),
            'travel' => $itinerary->getTravel()
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

        return $this->redirectToRoute('itinerary_index', ['id' => $itinerary->getTravel()->getId()]);
    }
}
