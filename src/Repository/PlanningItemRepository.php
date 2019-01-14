<?php

namespace App\Repository;

use App\Entity\PlanningItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method PlanningItem|null find($id, $lockMode = null, $lockVersion = null)
 * @method PlanningItem|null findOneBy(array $criteria, array $orderBy = null)
 * @method PlanningItem[]    findAll()
 * @method PlanningItem[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PlanningItemRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, PlanningItem::class);
    }

    // /**
    //  * @return PlanningItem[] Returns an array of PlanningItem objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?PlanningItem
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
