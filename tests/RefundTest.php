<?php

namespace App\Tests\Util;

use App\Util\Calculator;
use PHPUnit\Framework\TestCase;
use App\Entity\Traveler;
use App\Entity\Expense;
use App\Entity\Refund;
use Faker;

class RefundTest extends TestCase
{
    public function testTravelerRefundsAnotherTravelerPartiallyIsOk()
    {
        $faker = Faker\Factory::create('fr_FR');

        $traveler1 = new Traveler();
        $traveler1->setId(1);
        $traveler1->setEmail($faker->email);
        $traveler1->setUsername($faker->name);

        $traveler2 = new Traveler();
        $traveler2->setId(1);
        $traveler2->setEmail($faker->email);
        $traveler2->setUsername($faker->name);

        $expense = new Expense();
        $expense->setAmount(110);
        $expense->setDescription("restau à Anvers");
        $expense->setTraveler($traveler1);
        $expense->setRefundersList([$traveler1, $traveler2]);

        $refund = new Refund();
        $refund->setExpense($expense);
        $refund->setSum($expense->getAmount());

        // PARTIAL REFUND
        $newSum = $expense->getAmount() - 40;
        $refund->setSum($newSum);

        $this->assertTrue($refund->isOverMax($newSum));
        $this->assertEquals($refund->getSum(), 70);
    }

    public function testTravelerRefundsAnotherTravelerTotallyIsOk()
    {
        $faker = Faker\Factory::create('fr_FR');

        $traveler1 = new Traveler();
        $traveler1->setId(1);
        $traveler1->setEmail($faker->email);
        $traveler1->setUsername($faker->name);

        $traveler2 = new Traveler();
        $traveler2->setId(1);
        $traveler2->setEmail($faker->email);
        $traveler2->setUsername($faker->name);

        $expense = new Expense();
        $expense->setAmount(110);
        $expense->setDescription("restau à Anvers");
        $expense->setTraveler($traveler1);
        $expense->setRefundersList([$traveler1, $traveler2]);

        $refund = new Refund();
        $refund->setExpense($expense);
        $refund->setSum($expense->getAmount());

        // TOTAL REFUND
        $newSum = $expense->getAmount() - $expense->getAmount();
        $refund->setSum($newSum);

        $this->assertTrue($refund->isOverMax($newSum));
        $this->assertEquals($refund->getSum(), 0);
    }

    public function testTravelerRefundsAnotherTravelerForTooMuchIsOk()
    {
        $faker = Faker\Factory::create('fr_FR');

        $traveler1 = new Traveler();
        $traveler1->setId(1);
        $traveler1->setEmail($faker->email);
        $traveler1->setUsername($faker->name);

        $traveler2 = new Traveler();
        $traveler2->setId(1);
        $traveler2->setEmail($faker->email);
        $traveler2->setUsername($faker->name);

        $expense = new Expense();
        $expense->setAmount(110);
        $expense->setDescription("restau à Anvers");
        $expense->setTraveler($traveler1);
        $expense->setRefundersList([$traveler1, $traveler2]);

        $refund = new Refund();
        $refund->setExpense($expense);
        $refund->setSum($expense->getAmount());

        // TOTAL REFUND
        $newSum = $expense->getAmount() - $expense->getAmount();
        $refund->setSum($newSum);

        $this->assertFalse($refund->isOverMax($newSum));
        $this->assertEquals($refund->getSum(), 0);
    }
}