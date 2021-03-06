<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ExpenseRepository")
 */
class Expense
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     */
    private $date;

      /**
     * @ORM\Column(type="float")
     */
    private $amount;

    /**
     * @ORM\Column(type="string")
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Traveler", inversedBy="expenses")
     * @ORM\JoinColumn(nullable=false)
     */
    private $traveler;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Travel", inversedBy="expenses")
     * @ORM\JoinColumn(nullable=false)
     */
    private $travel;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Refund", mappedBy="expense")
     */
    private $refunds;

    
    private $refundersList = [];

    public function __construct(){
        $this->refunds = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

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

    public function getTravel(): ?Travel
    {
        return $this->travel;
    }

    public function setTravel(?Travel $travel): self
    {
        $this->travel = $travel;

        return $this;
    }

    /**
     * @return Collection|Refund[]
     */
    public function getRefunds(): Collection
    {
        return $this->refunds;
    }

    public function addRefund(Refund $refund): self
    {
        if (!$this->refunds->contains($refund)) {
            $this->refunds[] = $refund;
            $refund->setExpense($this);
        }

        return $this;
    }

    public function removeRefund(Refund $refund): self
    {
        if ($this->refunds->contains($refund)) {
            $this->refunds->removeElement($refund);
            // set the owning side to null (unless already changed)
            if ($refund->getExpense() === $this) {
                $refund->setExpense(null);
            }
        }

        return $this;
    }

    public function getRefundersList(): ?array
    {
        return $this->refundersList;
    }

    public function setRefundersList(?array $refundersList): self
    {
        $this->refundersList = $refundersList;

        return $this;
    }
}
