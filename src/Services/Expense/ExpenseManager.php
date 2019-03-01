<?php

namespace App\Services\Expense;

use App\Entity\Expense;
use App\Repository\ExpenseRepository;

class ExpenseManager
{

    /**
     * @var ExpenseRepository
     */
    private $repository;
    
    public function __construct(
        ExpenseRepository $repository
    )
    {
        $this->repository = $repository;
    }
    
    public function getDateExpenses($em) {
        
        $qb = $em->createQueryBuilder('e');

        return $dates = $qb->select('e.date')
                ->orderBy('e.date', 'DESC')
                ->groupBy('e.date')
                ->getQuery()
                ->getResult();

    }
}