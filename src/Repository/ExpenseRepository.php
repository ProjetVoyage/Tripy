<?php

namespace App\Repository;

use App\Entity\Expense;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use App\Repository\TravelerRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Expense|null find($id, $lockMode = null, $lockVersion = null)
 * @method Expense|null findOneBy(array $criteria, array $orderBy = null)
 * @method Expense[]    findAll()
 * @method Expense[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExpenseRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Expense::class);
    }

    public function findByDate($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.date = :date')
            ->setParameter('date', $value)
            ->orderBy('e.id', 'DESC')
            ->getQuery()
            ->getResult();
    }

    public function findTravelerByTravel($id_travel, $user)
    {
        $conn = $this->getEntityManager()->getConnection();
        $sql = "SELECT traveler.username, traveler.id
                FROM travel_traveler 
                INNER JOIN travel ON travel.id = travel_traveler.travel_id
                INNER JOIN traveler ON traveler.id = travel_traveler.traveler_id
                WHERE travel_traveler.travel_id = :id AND travel_traveler.traveler_id != :id_traveler";
        $stmt = $conn->prepare($sql);
        $stmt->BindValue(":id", $id_travel);
        $stmt->BindValue(":id_traveler", $user->getId());
        $stmt->execute();
        
        return $stmt->fetchAll();
    }

    /*
    public function findOneBySomeField($value): ?Expense
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
