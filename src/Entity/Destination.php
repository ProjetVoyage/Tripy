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
    private $countryName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $cityName;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Itinerary", inversedBy="destinations")
     * @ORM\JoinColumn(nullable=false)
     */
    private $itinerary;

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
        return $this->countryName;
    }

    public function setCountryName(?string $countryName): self
    {
        $this->countryName = $countryName;

        return $this;
    }

    public function getCityName(): ?string
    {
        return $this->cityName;
    }

    public function setCityName(?string $cityName): self
    {
        $this->cityName = $cityName;

        return $this;
    }

    public function getItinerary(): ?Itinerary
    {
        return $this->itinerary;
    }

    public function setItinerary(?Itinerary $itinerary): self
    {
        $this->itinerary = $itinerary;

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
