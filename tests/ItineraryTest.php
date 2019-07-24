<?php

namespace App\Tests\Util;

use App\Util\Calculator;
use PHPUnit\Framework\TestCase;
use App\Entity\Itinerary;
use App\Entity\Travel;
use Symfony\Component\HttpFoundation\JsonResponse;

class ItineraryTest extends TestCase
{
    public function testTheDepartureDateShouldNotBeAfterArrivalDate()
    {
        $travel = new Travel();
        $travel->setEndDate(new \DateTime('+10 days'));
        $itinerary = new Itinerary();
        $itinerary->setTravel($travel);
        $itinerary->setArrivalDate(new \DateTime());
        $this->assertInstanceOf(JsonResponse::class, $itinerary->setDepartureDate(new \DateTime('+2 days')));
        $this->assertTrue($itinerary->getDepartureDate() == null);
    }

    public function testTheArrrivalDateShouldNotBeBeforeDepartureDate()
    {
        $itinerary = new Itinerary();
        $itinerary->setDepartureDate(new \DateTime('+3 days'));
        $this->assertInstanceOf(JsonResponse::class, $itinerary->setArrivalDate(new \DateTime('+2 days')));
        $this->assertTrue($itinerary->getArrivalDate() == null);
    }

    public function testTheDepartureDateShouldNotBeBeforeCurrentDate() 
    {
        $itinerary = new Itinerary();
        $this->assertInstanceOf(JsonResponse::class, $itinerary->setDepartureDate(new \DateTime('-2 days')));
        $this->assertTrue($itinerary->getDepartureDate() == null);
    }

    public function testTheArrivalDateShouldNotBeAfterTravelEndDate() 
    {
        $travel = new Travel();
        $travel->setEndDate(new \DateTime());
        $itinerary = new Itinerary();
        $itinerary->setTravel($travel);
        $this->assertInstanceOf(JsonResponse::class, $itinerary->setArrivalDate(new \DateTime('+2 days')));
        $this->assertTrue($itinerary->getArrivalDate() == null);
    }
}