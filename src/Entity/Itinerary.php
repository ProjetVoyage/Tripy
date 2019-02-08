<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ItineraryRepository")
 */
class Itinerary
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $arrivalDate;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $departureDate;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $countryName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $cityName;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Travel", inversedBy="itineraries")
     * @ORM\JoinColumn(nullable=false)
     */
    private $travel;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Planning", mappedBy="itinerary")
     */
    private $planning;

    public function __construct()
    {
        $this->planning = new ArrayCollection();
    }
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getArrivalDate(): ?\DateTimeInterface
    {
        return $this->arrivalDate;
    }

    public function setArrivalDate(?\DateTimeInterface $arrivalDate): self
    {
        $this->arrivalDate = $arrivalDate;

        return $this;
    }

    public function getDepartureDate(): ?\DateTimeInterface
    {
        return $this->departureDate;
    }

    public function setDepartureDate(?\DateTimeInterface $departureDate): self
    {
        $this->departureDate = $departureDate;

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

    /**
     * @return Collection|Planning[]
     */
    public function getPlanning(): Collection
    {
        return $this->planning;
    }

    public function addPlanning(Planning $planning): self
    {
        if (!$this->planning->contains($planning)) {
            $this->planning[] = $planning;
            $planning->setItinerary($this);
        }

        return $this;
    }

    public function removePlanning(Planning $planning): self
    {
        if ($this->planning->contains($planning)) {
            $this->planning->removeElement($planning);
            // set the owning side to null (unless already changed)
            if ($planning->getItinerary() === $this) {
                $planning->setItinerary(null);
            }
        }

        return $this;
    }
    
}
