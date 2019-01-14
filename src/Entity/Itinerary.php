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
    private $arrival_date;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $departure_time;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Travel", inversedBy="itineraries")
     * @ORM\JoinColumn(nullable=false)
     */
    private $travel_id;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Destination", mappedBy="itinerary_id")
     */
    private $destinations;

    public function __construct()
    {
        $this->destinations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getArrivalDate(): ?\DateTimeInterface
    {
        return $this->arrival_date;
    }

    public function setArrivalDate(?\DateTimeInterface $arrival_date): self
    {
        $this->arrival_date = $arrival_date;

        return $this;
    }

    public function getDepartureTime(): ?\DateTimeInterface
    {
        return $this->departure_time;
    }

    public function setDepartureTime(?\DateTimeInterface $departure_time): self
    {
        $this->departure_time = $departure_time;

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

    /**
     * @return Collection|Destination[]
     */
    public function getDestinations(): Collection
    {
        return $this->destinations;
    }

    public function addDestination(Destination $destination): self
    {
        if (!$this->destinations->contains($destination)) {
            $this->destinations[] = $destination;
            $destination->setItineraryId($this);
        }

        return $this;
    }

    public function removeDestination(Destination $destination): self
    {
        if ($this->destinations->contains($destination)) {
            $this->destinations->removeElement($destination);
            // set the owning side to null (unless already changed)
            if ($destination->getItineraryId() === $this) {
                $destination->setItineraryId(null);
            }
        }

        return $this;
    }
}
