<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TaskRepository")
 */
class Task
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
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $due_date;

    /**
     * @ORM\Column(type="boolean")
     */
    private $done;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\TaskList", inversedBy="tasks")
     * @ORM\JoinColumn(nullable=false)
     */
    private $task_list_id;

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

    public function getDueDate(): ?\DateTimeInterface
    {
        return $this->due_date;
    }

    public function setDueDate(?\DateTimeInterface $due_date): self
    {
        $this->due_date = $due_date;

        return $this;
    }

    public function getDone(): ?bool
    {
        return $this->done;
    }

    public function setDone(bool $done): self
    {
        $this->done = $done;

        return $this;
    }

    public function getTaskListId(): ?TaskList
    {
        return $this->task_list_id;
    }

    public function setTaskListId(?TaskList $task_list_id): self
    {
        $this->task_list_id = $task_list_id;

        return $this;
    }
}
