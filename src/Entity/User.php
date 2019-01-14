<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User
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
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Traveler", mappedBy="user_id")
     */
    private $travelers;

    public function __construct()
    {
        $this->travelers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @return Collection|Traveler[]
     */
    public function getTravelers(): Collection
    {
        return $this->travelers;
    }

    public function addTraveler(Traveler $traveler): self
    {
        if (!$this->travelers->contains($traveler)) {
            $this->travelers[] = $traveler;
            $traveler->setUserId($this);
        }

        return $this;
    }

    public function removeTraveler(Traveler $traveler): self
    {
        if ($this->travelers->contains($traveler)) {
            $this->travelers->removeElement($traveler);
            // set the owning side to null (unless already changed)
            if ($traveler->getUserId() === $this) {
                $traveler->setUserId(null);
            }
        }

        return $this;
    }
}
