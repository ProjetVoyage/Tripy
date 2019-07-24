<?php

namespace App\Tests;

use App\Entity\Traveler;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Faker;

class AuthTest extends KernelTestCase
{
    public function testAuth()
    {
        self::bootKernel();

        $em = self::$kernel->getContainer()
            ->get('doctrine')
            ->getManager();

        $faker = Faker\Factory::create('fr_FR');

        $email = $faker->email;

        $traveler = new Traveler();

        $traveler->setUsername($faker->userName);
        $traveler->setEmail($email);
        $traveler->setPassword($faker->password);
        $traveler->setImage($faker->uuid);

        $em->persist($traveler);
        $em->flush();

        $travelerRepoitory = self::$kernel->getContainer()
            ->get('doctrine')
            ->getRepository(Traveler::class);

        $travelerFind = $travelerRepoitory->findOneBy(['email' => $email]);

        $this->assertNotNull($travelerFind);
        $this->assertEquals($traveler->getPassword(), $travelerFind->getPassword());

    }
}