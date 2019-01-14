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
    private $traveler_id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Travel", inversedBy="luggage")
     * @ORM\JoinColumn(nullable=false)
     */
    private $travel_id;

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

    public function getTravelerId(): ?Traveler
    {
        return $this->traveler_id;
    }

    public function setTravelerId(?Traveler $traveler_id): self
    {
        $this->traveler_id = $traveler_id;

        return $this;
    }

    public function getTravelId(): ?Travel
    {
        return $this->travel_id;
    }

    public function setTravelId(?Travel $travel_id): self
    {
        $this->travel_id = $travel_id;

        return $this;
    }
}
