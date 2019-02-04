<?php

namespace App\Controller\Backend;

use App\Entity\Expense;
use App\Entity\Travel;
use App\Form\ExpenseType;
use App\Repository\ExpenseRepository;
use App\Repository\TravelRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ExpenseController extends AbstractController
{
    /**
     * @Route("travels/{id}/expenses/", name="expense_index", methods={"GET"})
     */
    public function index(ExpenseRepository $expenseRepository, Travel $travel): Response
    {
        $expenses = $expenseRepository->findBy(['travel' => $travel]);

        return $this->render('backend/expense/index.html.twig', ['expenses' => $expenses, 'travel' => $travel]);
    }

    /**
     * @Route("travels/{id}/expenses/new", name="expense_new", methods={"GET","POST"})
     */
    public function new(Request $request, Travel $travel): Response
    {
        $expense = new Expense();
        $expense->setTravel($travel);
        $form = $this->createForm(ExpenseType::class, $expense);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($expense);
            $entityManager->flush();

            return $this->redirectToRoute('expense_index', [ 'id' => $travel->getId() ]);
        }

        return $this->render('backend/expense/new.html.twig', [
            'expense' => $expense,
            'form' => $form->createView(),
            'travel' => $travel
        ]);
    }

    /**
     * @Route("/expenses/{id}", name="expense_show", methods={"GET"})
     */
    public function show(Expense $expense): Response
    {
        return $this->render('backend/expense/show.html.twig', ['expense' => $expense]);
    }

    /**
     * @Route("/expenses/{id}/edit", name="expense_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Expense $expense): Response
    {
        $form = $this->createForm(ExpenseType::class, $expense);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('expense_index', ['id' => $expense->getTravel()->getId()]);
        }

        return $this->render('backend/expense/edit.html.twig', [
            'expense' => $expense,
            'form' => $form->createView(),
            'travel' => $expense->getTravel()
        ]);
    }

    /**
     * @Route("/{id}", name="expense_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Expense $expense): Response
    {
        if ($this->isCsrfTokenValid('delete'.$expense->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($expense);
            $entityManager->flush();
        }

        return $this->redirectToRoute('expense_index', ['id' => $expense->getTravel()->getId()]);
    }
}
