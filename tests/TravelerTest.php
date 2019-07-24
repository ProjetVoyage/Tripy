<?php


namespace App\Tests;


use App\Entity\Traveler;
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
}