<?php

namespace App\Tests\Util;

use App\Util\Calculator;
use PHPUnit\Framework\TestCase;
use App\Entity\Traveler;
use App\Entity\Travel;

use Faker;

class TravelerTest extends TestCase
{
    public function testTravelerInviteSameTraveler()
    {
        $faker = Faker\Factory::create('fr_FR');

        $travel = new Travel();
        $travel->setId(1);
        $travel->setName($faker->name);

        $traveler1 = new Traveler();
        $traveler1->setEmail($faker->email);
        $traveler1->setUsername($faker->name);

        $traveler2 = new Traveler();
        $traveler2->setEmail($faker->email);
        $traveler2->setUsername($faker->name);

        $travel->addTraveler($traveler1);
        $travel->addTraveler( $traveler2);
        $travel->addTraveler( $traveler2); //ajout de doublon

       

        $numberTravelers= $travel->getTravelers();

        $this->assertEquals(count($numberTravelers), 2);
    }
  
}