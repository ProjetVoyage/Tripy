<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\LuggageRepository")
 */
class Luggage
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Traveler", inversedBy="luggage")
     * @ORM\JoinColumn(nullable=false)
     */
    private $traveler;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Travel", inversedBy="luggage")
     * @ORM\JoinColumn(nullable=false)
     */
    private $travel;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

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
}
