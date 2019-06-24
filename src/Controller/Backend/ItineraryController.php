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
    public function index(Travel $travel, ItineraryRepository $itineraryRepository, Request $request): Response
    {
        $itineraries = $itineraryRepository->findBy(
            ['travel' => $travel->getId()],
            ['departureDate' => 'ASC']
        );

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

        return $this->render('backend/itinerary/index.html.twig', ['itineraries' => $itineraries, 'travel' => $travel, 'form' => $form->createView()]);
    }

    /**
     * @Route("/travels/{id}/itineraries_ajax/", name="itinerary_index_ajax", methods={"GET","POST"})
     */
    // public function indexAjax(Travel $travel, ItineraryRepository $itineraryRepository, Request $request)
    // {

    //     $data = $request->request->get('id_travel');
        
    //     $itineraries = $itineraryRepository->findBy(
    //         ['travel' => $data],
    //         ['departureDate' => 'ASC']
    //     );
        
    //     $response = new Response(json_encode(array(
    //         'data' => $itineraries
    //     )));
    //     $response->headers->set('Content-Type', 'application/json');
    
    //     return $response;
    // }


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
     * @Route("/travels/{id}/itineraries/newByAjax", name="itinerary_new_by_ajax", methods={"GET","POST"})
     */
    public function newByAjax(Request $request, Travel $travel): Response
    {
        $data = $request->request->get('itinerary');
        $date_debut_exploded = explode('/', $data['departureDate']);
        $date_debut_done = $date_debut_exploded[2] . '-' . $date_debut_exploded[1] . '-' .  $date_debut_exploded[0];
        
        $date_fin_exploded = explode('/', $data['arrivalDate']);
        $date_fin_done = $date_fin_exploded[2] . '-' . $date_fin_exploded[1] . '-' .  $date_fin_exploded[0];

        $date_debut = new \DateTime($date_debut_done);
        $date_fin = new \DateTime($date_fin_done);
        
        $entityManager = $this->getDoctrine()->getManager();
        
        $itinerary = new Itinerary();
        $itinerary->setTravel($travel);
        $itinerary->setDepartureDate($date_debut);
        $itinerary->setArrivalDate($date_fin);
        $itinerary->setCountryName($data['countryName']);
        $itinerary->setCityName($data['cityName']);
        $itinerary->setLatitude($data['latitude']);
        $itinerary->setLongitude($data['longitude']);

        $entityManager->persist($itinerary);
        $entityManager->flush();

        return $this->redirectToRoute('itinerary_index', ['id' => $data['id_travel']]);
    }

    /**
     * @Route("/itineraries/{id}/editByAjax", name="itinerary_edit_by_ajax", methods={"GET","POST"})
     */
    // public function editByAjax(Request $request, Itinerary $itinerary): Response
    // {
    //     $data = $request->request->get('itinerary');
    //     $date_debut_exploded = explode('/', $data['departureDate']);
    //     $date_debut_done = $date_debut_exploded[2] . '-' . $date_debut_exploded[1] . '-' .  $date_debut_exploded[0];
        
    //     $date_fin_exploded = explode('/', $data['arrivalDate']);
    //     $date_fin_done = $date_fin_exploded[2] . '-' . $date_fin_exploded[1] . '-' .  $date_fin_exploded[0];

    //     $date_debut = new \DateTime($date_debut_done);
    //     $date_fin = new \DateTime($date_fin_done);
        
    //     $entityManager = $this->getDoctrine()->getManager();
        
    //     $itinerary->setTravel($travel);
    //     $itinerary->setDepartureDate($date_debut);
    //     $itinerary->setArrivalDate($date_fin);
    //     $itinerary->setCountryName($data['countryName']);
    //     $itinerary->setCityName($data['cityName']);
    //     $entityManager->flush();

    //     return $this->redirectToRoute('itinerary_index', ['id' => $data['id_travel']]);
    // }

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