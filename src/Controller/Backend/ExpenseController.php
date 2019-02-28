<?php

namespace App\Controller\Backend;

use App\Entity\Expense;
use App\Entity\Travel;
use App\Entity\Refund;
use App\Form\ExpenseType;
use App\Repository\ExpenseRepository;
use App\Repository\TravelerRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\DateTime;
use App\Services\Expense\ExpenseManager;

class ExpenseController extends AbstractController
{

    /**
     * @var ExpenseManager
     */
    private $expenseManager;
    
    public function __construct(
        ExpenseManager $expenseManager
    )
    {
        $this->expenseManager = $expenseManager;
    }

    /**
     * @Route("travels/{id}/expenses/", name="expense_index", methods={"GET"})
     */
    public function index(ExpenseRepository $expenseRepository, Travel $travel, Request $request): Response
    {
        if($request->query->get('date')) {
            $date = date_create($request->query->get('date'));

            $expenses = $expenseRepository->findBy(['travel' => $travel, 'date' => $date] , ['date' => 'DESC']);
        } else {
            $expenses = $expenseRepository->findBy(['travel' => $travel] , ['date' => 'DESC']);
        }
        
        $total = 0;
        
        $em = $this->getDoctrine()->getRepository(Expense::class);

        $dates = $this->expenseManager->getDateExpenses($em);
                
        foreach ($expenses as $expense) {
            $total += $expense->getAmount();
        }

        if($request->query->get('date')) {
            $date = date_create($request->query->get('date'));

            $values = ['date' => $date, 'total' => $total, 'dates' => $dates, 'expenses' => $expenses, 'travel' => $travel];
        } else {
            $values = ['total' => $total, 'dates' => $dates, 'expenses' => $expenses, 'travel' => $travel];
        }

        return $this->render('backend/expense/index.html.twig', $values);
    }

    /**
     * @Route("travels/{id}/expenses/new", name="expense_new", methods={"GET","POST"})
     */
    public function new(TravelerRepository $travelerRepository, ExpenseRepository $expenseRepository, Request $request, Travel $travel): Response
    {
        $expense = new Expense();
        $expense->setTravel($travel);

        $form = $this->createForm(ExpenseType::class, $expense);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $data = $request->request->get('expense');
            
            $amount = ($data['amount'] / (sizeof($data['refundersList']) + 1));
            
            $user = $this->get('security.token_storage')->getToken()->getUser();
                
            $id_user = $user->getId();
            
            $userConnected = $travelerRepository->find($id_user);
            
            $expense->setTraveler($userConnected);
            
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($expense);
            $entityManager->flush();

            $expense_id = $expenseRepository->find($expense->getId());

            foreach($data['refundersList'] as $id_refunder)
            {
                
                $refunder = $travelerRepository->find($id_refunder);

                $refund = new Refund();
                $refund->setSum($amount);
                $refund->setExpense($expense_id);
                $refund->setTraveler($refunder);

                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($refund);
                $entityManager->flush();
            }

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
        return $this->render('backend/expense/show.html.twig', ['expenses' => $expense, 'travel' => $expense->getTravel() ]);
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
     * @Route("/expenses/{id}", name="expense_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Expense $expense): Response
    {
        if ($this->isCsrfTokenValid('delete'.$expense->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($expense);
            $entityManager->flush();
        }

        return $this->redirectToRoute('expense_index', ['expenses' => $expense->getTravel()->getExpenses(), 'id' => $expense->getTravel()->getId()]);
    }

    /**
     * @Route("/expenses/date/show", name="expense_at_date", methods={"GET"})
     */
    public function showAtDate(ExpenseRepository $expenseRepository, Request $request)
    {
        $date = $request->query->get('date');
        $expenses = $expenseRepository->findByDate(date_create($date["date"]["date"]));

        return $this->render('backend/expense/show.html.twig', ['expenses' => $expenses, 'travel' => $expenses[0]->getTravel()]);
    }
}
