<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TravelerRepository")
 */
class Traveler
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="travelers")
     * @ORM\JoinColumn(nullable=false)
     */
    private $users_id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Travel", inversedBy="travelers")
     * @ORM\JoinColumn(nullable=false)
     */
    private $travel_id;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Luggage", mappedBy="traveler_id")
     */
    private $luggage;

    public function __construct()
    {
        $this->luggage = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsersId(): ?User
    {
        return $this->users_id;
    }

    public function setUserId(?User $users_id): self
    {
        $this->users_id = $users_id;

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
     * @return Collection|Luggage[]
     */
    public function getLuggage(): Collection
    {
        return $this->luggage;
    }

    public function addLuggage(Luggage $luggage): self
    {
        if (!$this->luggage->contains($luggage)) {
            $this->luggage[] = $luggage;
            $luggage->setTravelerId($this);
        }

        return $this;
    }

    public function removeLuggage(Luggage $luggage): self
    {
        if ($this->luggage->contains($luggage)) {
            $this->luggage->removeElement($luggage);
            // set the owning side to null (unless already changed)
            if ($luggage->getTravelerId() === $this) {
                $luggage->setTravelerId(null);
            }
        }

        return $this;
    }
}
