<?php


namespace App\Tests;


use App\Entity\Traveler;
use App\Entity\Travel;
use PHPUnit\Framework\TestCase;
use Faker;

class TravelerTest extends TestCase
{
//    public function testTraveler()
//    {
//        $traveler = new Traveler();
//        $this->assertInstanceOf('UserInterface', $traveler);
//    }
    public function testId()
    {
        $faker = Faker\Factory::create('fr_FR');

        $id = $faker->numberBetween();

        $traveler = new Traveler();
        $traveler->setId($id);

        $this->assertEquals($traveler->getId(), $id);
    }

    public function testEmail()
    {
        $faker = Faker\Factory::create('fr_FR');

        $email = $faker->email;

        $traveler = new Traveler();
        $traveler->setEmail($email);

        $this->assertEquals($traveler->getEmail(), $email);
    }

    public function testUsername()
    {
        $faker = Faker\Factory::create('fr_FR');

        $username = $faker->userName;

        $traveler = new Traveler();
        $traveler->setUsername($username);

        $this->assertEquals($traveler->getUsername(), $username);
    }

    public function testImage()
    {
        $faker = Faker\Factory::create('fr_FR');

        $image = $faker->uuid;

        $traveler = new Traveler();
        $traveler->setImage($image);

        $this->assertEquals($traveler->getImage(), $image);
    }

    public function testPassword()
    {
        $faker = Faker\Factory::create('fr_FR');

        $password = $faker->password;

        $traveler = new Traveler();
        $traveler->setPassword($password);

        $this->assertEquals($traveler->getPassword(), $password);
    }

    public function testRole()
    {
        $traveler = new Traveler();
        // guarantee every user at least has ROLE_USER
        $this->assertEquals($traveler->getRoles(), ['ROLE_USER']);

        $traveler->setRoles(['ROLE_ADMIN']);

        $this->assertEquals($traveler->getRoles(), ['ROLE_ADMIN', 'ROLE_USER']);
    }

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