<?php

namespace App\Controller\Backend;

use App\Entity\Refund;
use App\Form\RefundType;
use App\Entity\Expense;
use App\Repository\RefundRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class RefundController extends AbstractController
{
    /**
     * @Route("expenses/{id}/refund", name="refund_index", methods={"GET"})
     */
    public function index(RefundRepository $refundRepository, Expense $expense, Request $request): Response
    {
        return $this->render('backend/refund/index.html.twig', ['refunds' => $refundRepository->findBy(['expense' => $expense]), 'expense' => $expense]);
    }
    
    /**
     * @Route("expenses/{id}/refund/new", name="refund_new", methods={"GET","POST"})
     *//*
    public function new(Request $request): Response
    {
        $refund = new Refund();
        $refund->

        $form = $this->createForm(RefundType::class, $refund);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($refund);
            $entityManager->flush();

            return $this->redirectToRoute('refund_index');
        }

        return $this->render('backend/refund/new.html.twig', [
            'refund' => $refund,
            'form' => $form->createView(),
        ]);
    }
    */

    /**
     * @Route("/refund/{id}", name="refund_show", methods={"GET"})
     *//*
    public function show(Refund $refund): Response
    {
        return $this->render('backend/refund/show.html.twig', ['refund' => $refund]);
    }*/

    /**
     * @Route("/refund/{id}/edit", name="refund_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Refund $refund): Response
    {
        $form = $this->createForm(RefundType::class, $refund);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('refund_index', ['id' => $refund->getExpense()->getId()]);
        }

        return $this->render('backend/refund/edit.html.twig', [
            'refund' => $refund,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/refund/{id}", name="refund_delete", methods={"DELETE"})
     */
    /*
    public function delete(Request $request, Refund $refund): Response
    {
        if ($this->isCsrfTokenValid('delete'.$refund->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($refund);
            $entityManager->flush();
        }

        return $this->redirectToRoute('refund_index');
    }*/
}
