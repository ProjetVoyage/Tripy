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
use JMS\Payment\CoreBundle\Form\ChoosePaymentMethodType;
use JMS\Payment\CoreBundle\PluginController\PluginController;
use JMS\Payment\CoreBundle\PluginController\Result;


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
     * @Route("/refund/{id}/show", name="app_orders_paymentcomplete")
     */
    public function showAction($id, Request $request, PluginController $ppc)
    {
        $order = $this->getDoctrine()->getManager()->getRepository(Refund::class)->find($id);

        $config = [
            'paypal_express_checkout' => [
                'return_url' => 'http://127.0.0.1:8000/expenses/4/refund',
                'cancel_url' => 'http://127.0.0.1:8000/expenses/4/refund',
                'useraction' => 'commit'
            ]
        ];

        $form = $this->createForm(ChoosePaymentMethodType::class, null, [
            'amount'   => $order->getSum(),
            'currency' => 'EUR',
            'predefined_data' => $config
        ]);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $ppc->createPaymentInstruction($instruction = $form->getData());

            $order->setPaymentInstruction($instruction);

            $em = $this->getDoctrine()->getManager();
            $em->persist($order);
            $em->flush($order);
            
            return $this->redirectToRoute('app_orders_paymentcreate', [
                'id' => $order->getId(),
            ]);
        }

        return $this->render('backend/refund/refundshow.html.twig', [
            'order' => $order,
            'form'  => $form->createView(),
        ]);
    }

    private function createPayment(Refund $order, PluginController $ppc)
    {
        $instruction = $order->getPaymentInstruction();
        $pendingTransaction = $instruction->getPendingTransaction();

        if ($pendingTransaction !== null) {
            return $pendingTransaction->getPayment();
        }

        $amount = $instruction->getAmount() - $instruction->getDepositedAmount();

        return $ppc->createPayment($instruction->getId(), $amount);
    }

    /**
     * @Route("/{id}/payment/create", name="app_orders_paymentcreate")
     */
    public function paymentCreateAction($id, PluginController $ppc)
    {
        $order = $this->getDoctrine()->getManager()->getRepository(Refund::class)->find($id);
        $payment = $this->createPayment($order, $ppc);
        
        $result = $ppc->approveAndDeposit($payment, $payment->getTargetAmount());
        
        die();
        if ($result->getStatus() === Result::STATUS_SUCCESS) {
            return $this->redirectToRoute('app_orders_paymentcomplete', [
                'id' => $order->getId(),
            ]);
        }

        throw $result->getPluginException();

        // In a real-world application you wouldn't throw the exception. You would,
        // for example, redirect to the showAction with a flash message informing
        // the user that the payment was not successful.
    }

    /**
     * @Route("/{id}/payment/complete")
     */
    public function paymentCompleteAction($id)
    {
        return new Response('Payment complete');
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
        
        // $config = [
        //     'paypal_express_checkout' => [
        //         'return_url' => 'http://127.0.0.1:8000/expenses/4/refund',
        //         'cancel_url' => 'http://127.0.0.1:8000/expenses/4/refund',
        //         'useraction' => 'commit'
        //     ]
        // ];

        // $form = $this->createForm(ChoosePaymentMethodType::class, null, [
        //     'amount'          => 10.00,
        //     'currency'        => 'EUR',
        //     'predefined_data' => $config,
        // ]);

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
    public function delete(Request $request, Refund $refund): Response
    {
        if ($this->isCsrfTokenValid('delete' . $refund->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($refund);
            $entityManager->flush();
        }

        return $this->redirectToRoute('refund_index', ['id' => $refund->getExpense()->getId()]);
    }
}
