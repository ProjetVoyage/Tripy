<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TravelRepository")
 */
class Travel
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
     * @ORM\OneToMany(targetEntity="App\Entity\TaskList", mappedBy="travel_id")
     */
    private $taskLists;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Folder", mappedBy="travel_id")
     */
    private $folders;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Luggage", mappedBy="travel_id")
     */
    private $luggage;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Itinerary", mappedBy="travel_id")
     */
    private $itineraries;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Traveler", inversedBy="travels")
     */
    private $travelers;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Expense", mappedBy="travel")
     */
    private $expenses;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $startDate;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $endDate;

    public function __construct()
    {
        $this->travelers = new ArrayCollection();
        $this->budgets = new ArrayCollection();
        $this->taskLists = new ArrayCollection();
        $this->folders = new ArrayCollection();
        $this->luggage = new ArrayCollection();
        $this->itineraries = new ArrayCollection();
        $this->expenses = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId($id): self
    {
        $this->id = $id;

        return $this;
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
            $traveler->addTravel($this);
        }

        return $this;
    }

    public function removeTraveler(Traveler $traveler): self
    {
        if ($this->travelers->contains($traveler)) {
            $this->travelers->removeElement($traveler);
            // set the owning side to null (unless already changed)
            if ($traveler->getTravels() === $this) {
                $traveler->addTravel(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|TaskList[]
     */
    public function getTaskLists(): Collection
    {
        return $this->taskLists;
    }

    public function addTaskList(TaskList $taskList): self
    {
        if (!$this->taskLists->contains($taskList)) {
            $this->taskLists[] = $taskList;
            $taskList->setTravelId($this);
        }

        return $this;
    }

    public function removeTaskList(TaskList $taskList): self
    {
        if ($this->taskLists->contains($taskList)) {
            $this->taskLists->removeElement($taskList);
            // set the owning side to null (unless already changed)
            if ($taskList->getTravel() === $this) {
                $taskList->setTravel(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Folder[]
     */
    public function getFolders(): Collection
    {
        return $this->folders;
    }

    public function addFolder(Folder $folder): self
    {
        if (!$this->folders->contains($folder)) {
            $this->folders[] = $folder;
            $folder->setTravel($this);
        }

        return $this;
    }

    public function removeFolder(Folder $folder): self
    {
        if ($this->folders->contains($folder)) {
            $this->folders->removeElement($folder);
            // set the owning side to null (unless already changed)
            if ($folder->getTravel() === $this) {
                $folder->setTravel(null);
            }
        }

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
            $luggage->setTravel($this);
        }

        return $this;
    }

    public function removeLuggage(Luggage $luggage): self
    {
        if ($this->luggage->contains($luggage)) {
            $this->luggage->removeElement($luggage);
            // set the owning side to null (unless already changed)
            if ($luggage->getTravel() === $this) {
                $luggage->setTravel(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Itinerary[]
     */
    public function getItineraries(): Collection
    {
        return $this->itineraries;
    }

    public function addItinerary(Itinerary $itinerary): self
    {
        if (!$this->itineraries->contains($itinerary)) {
            $this->itineraries[] = $itinerary;
            $itinerary->setTravel($this);
        }

        return $this;
    }

    public function removeItinerary(Itinerary $itinerary): self
    {
        if ($this->itineraries->contains($itinerary)) {
            $this->itineraries->removeElement($itinerary);
            // set the owning side to null (unless already changed)
            if ($itinerary->getTravel() === $this) {
                $itinerary->setTravel(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Expense[]
     */
    public function getExpenses(): Collection
    {
        return $this->expenses;
    }

    public function addExpense(Expense $expense): self
    {
        if (!$this->expenses->contains($expense)) {
            $this->expenses[] = $expense;
            $expense->setTravel($this);
        }

        return $this;
    }

    public function removeExpense(Expense $expense): self
    {
        if ($this->expenses->contains($expense)) {
            $this->expenses->removeElement($expense);
            // set the owning side to null (unless already changed)
            if ($expense->getTravel() === $this) {
                $expense->setTravel(null);
            }
        }

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(?\DateTimeInterface $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(?\DateTimeInterface $endDate): self
    {
        $this->endDate = $endDate;

        return $this;
    }
}
