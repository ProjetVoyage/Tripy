<?php

namespace App\Repository;

use App\Entity\Traveler;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Traveler|null find($id, $lockMode = null, $lockVersion = null)
 * @method Traveler|null findOneBy(array $criteria, array $orderBy = null)
 * @method Traveler[]    findAll()
 * @method Traveler[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TravelerRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Traveler::class);
    }

    // /**
    //  * @return Traveler[] Returns an array of Traveler objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Traveler
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
