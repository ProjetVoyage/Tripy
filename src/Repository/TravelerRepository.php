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
    public function findByWord($keyword): ?Traveler
    {
        $result = $this->createQueryBuilder('t')
            ->where('t.username LIKE :key')->orWhere('t.email LIKE :key')
            ->setParameter('key', '%' . $keyword . '%')->getQuery();

        $query = $this->createQueryBuilder('t')
            ->where('t.username LIKE :key')
            ->setParameter('key', '%' . $keyword . '%')
            ->getQuery();
        return $query->getResult();
    }

    public function findByMail($value): ?Traveler
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
