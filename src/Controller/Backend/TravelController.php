<?php

namespace App\Controller\Backend;

use App\Entity\Travel;
use App\Form\TravelType;
use App\Repository\TravelRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/travels")
 */
class TravelController extends AbstractController
{
    /**
     * @Route("/", name="travels_index", methods={"GET"})
     */
    public function index(TravelRepository $travelRepository): Response
    {
        return $this->render('backend/travel/index.html.twig', ['travels' => $travelRepository->findAll()]);
    }

    /**
     * @Route("/new", name="travels_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $travel = new Travel();
        $authUser = $this->get('security.token_storage')->getToken()->getUser();
        $travel->addTraveler($authUser);
        $form = $this->createForm(TravelType::class, $travel);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($travel);
            $entityManager->flush();

            return $this->redirectToRoute('travels_index');
        }

        return $this->render('backend/travel/new.html.twig', [
            'travel' => $travel,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="travels_show", methods={"GET"})
     */
    public function show(Travel $travel): Response
    {
        return $this->render('backend/travel/show.html.twig', ['travel' => $travel,'travelers' => $travel->getTravelers()]);
    }



    /**
     * @Route("/{id}/edit", name="travels_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Travel $travel): Response
    {
        $form = $this->createForm(TravelType::class, $travel);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($travel);
            $entityManager->flush();
            return $this->redirectToRoute('travels_index', ['id' => $travel->getId()]);
        }

        return $this->render('backend/travel/edit.html.twig', [
            'travel' => $travel,
            'form' => $form->createView(),
        ]);

       // 'form' => $form->createView(),'travelers'=>$travel->getTravelers()

    }

    /**
     * @Route("/{id}", name="travels_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Travel $travel): Response
    {
        if ($this->isCsrfTokenValid('delete'.$travel->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($travel);
            $entityManager->flush();
        }

        return $this->redirectToRoute('travels_index');
    }

    
 
  
}
