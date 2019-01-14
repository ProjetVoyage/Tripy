<?php

namespace App\Repository;

use App\Entity\LuggageItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method LuggageItem|null find($id, $lockMode = null, $lockVersion = null)
 * @method LuggageItem|null findOneBy(array $criteria, array $orderBy = null)
 * @method LuggageItem[]    findAll()
 * @method LuggageItem[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LuggageItemRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, LuggageItem::class);
    }

    // /**
    //  * @return LuggageItem[] Returns an array of LuggageItem objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?LuggageItem
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
