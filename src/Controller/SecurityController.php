<?php

namespace App\Controller;

use App\Entity\Traveler;
use App\Form\TravelerType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;


/**
 * Class SecurityController
 * @package App\Controller
 * @Route(name="app_security_")
 */
class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="login")
     */
    public function login(AuthenticationUtils $helper): Response
    {
        return $this->render('security/login.html.twig', [
            'error' => $helper->getLastAuthenticationError(),
        ]);
    }

    /**
     * @Route("/register", name="registration")
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function registerAction(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        if ($this->getUser() instanceof Traveler) {
            return $this->redirectToRoute('app_security_login');
        }

        $traveler = new Traveler();
        $form = $this->createForm(TravelerType::class, $traveler);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $password = $passwordEncoder->encodePassword($traveler, $traveler->getPassword());
            $traveler->setPassword($password);
            $traveler->setRoles(['ROLE_USER']);
            $em = $this->getDoctrine()->getManager();
            $em->persist($traveler);
            $em->flush();
            return $this->redirectToRoute('app_security_login');
        }
        return $this->render(
            'security/register.html.twig', [
                'form' => $form->createView()
            ]
        );
    }

    /**
     * @Route(path="/logout", name="logout")
     * @throws \Exception
     */
    public function logout(): void
    {
        throw new \Exception('This should never be reached!');
    }
}
