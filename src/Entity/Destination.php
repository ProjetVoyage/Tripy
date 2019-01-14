<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DestinationRepository")
 */
class Destination
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $country_name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $city_name;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Itinerary", inversedBy="destinations")
     * @ORM\JoinColumn(nullable=false)
     */
    private $itinerary_id;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Planning", mappedBy="destination_id", cascade={"persist", "remove"})
     */
    private $planning;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCountryName(): ?string
    {
        return $this->country_name;
    }

    public function setCountryName(?string $country_name): self
    {
        $this->country_name = $country_name;

        return $this;
    }

    public function getCityName(): ?string
    {
        return $this->city_name;
    }

    public function setCityName(?string $city_name): self
    {
        $this->city_name = $city_name;

        return $this;
    }

    public function getItineraryId(): ?Itinerary
    {
        return $this->itinerary_id;
    }

    public function setItineraryId(?Itinerary $itinerary_id): self
    {
        $this->itinerary_id = $itinerary_id;

        return $this;
    }

    public function getPlanning(): ?Planning
    {
        return $this->planning;
    }

    public function setPlanning(Planning $planning): self
    {
        $this->planning = $planning;

        // set the owning side of the relation if necessary
        if ($this !== $planning->getDestinationId()) {
            $planning->setDestinationId($this);
        }

        return $this;
    }
}
