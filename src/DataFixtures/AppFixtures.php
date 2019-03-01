<?php
/**
 * Created by PhpStorm.
 * User: fattar
 * Date: 2019-03-01
 * Time: 08:54
 */

namespace App\DataFixtures;

use App\Entity\Traveler;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    private $faker;

    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->faker = Faker\Factory::create();
        $this->passwordEncoder = $passwordEncoder;
    }

    /**
     * Load data fixtures with the passed EntityManager
     *
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager):void
    {
        $this->loadUsers($manager);
    }

    public function loadUsers(ObjectManager $manager): void
    {
        $user = new Traveler();
        $user->setUsername('user');
        $user->setEmail('user@test.test');
        $password = $this->passwordEncoder->encodePassword($user, 'user');
        $user->setPassword($password);
        $user->setRoles(['ROLE_USER']);

        $manager->persist($user);
        $manager->flush();

        $this->addReference('user', $user);
    }
}