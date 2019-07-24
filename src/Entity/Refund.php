<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Payment\CoreBundle\Entity\PaymentInstruction;

/**
 * @ORM\Entity(repositoryClass="App\Repository\RefundRepository")
 */
class Refund
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $sum;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Expense", inversedBy="refunds")
     */
    private $expense;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Traveler", inversedBy="refunds")
     */
    private $traveler;

     /**
     * @ORM\OneToOne(targetEntity="JMS\Payment\CoreBundle\Entity\PaymentInstruction")
     */
    private $paymentInstruction;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSum(): ?int
    {
        return $this->sum;
    }

    public function setSum(?int $sum)
    {
        if ($this->isUnderMax($sum)) 
        {
            $this->sum = $sum;
        } else {
            $this->sum = 0;
            return "Vous ne pouvez pas rembourser plus que le montant maximum de la dépense, nous l'avons réduite à 0";
        }

        return $this;
    }

    public function getExpense(): ?Expense
    {
        return $this->expense;
    }

    public function setExpense(?Expense $expense): self
    {
        $this->expense = $expense;

        return $this;
    }

    public function getTraveler(): ?Traveler
    {
        return $this->traveler;
    }

    public function setTraveler(?Traveler $traveler): self
    {
        $this->traveler = $traveler;

        return $this;
    }

    public function getPaymentInstruction()
    {
        return $this->paymentInstruction;
    }

    public function setPaymentInstruction(PaymentInstruction $instruction)
    {
        $this->paymentInstruction = $instruction;
    }

    public function isUnderMax($amount) {
        return $this->sum > $amount;
    }
}
