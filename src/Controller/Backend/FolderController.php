<?php

namespace App\Controller\Backend;

use App\Entity\Travel;
use App\Entity\Folder;
use App\Form\FolderType;
use App\Repository\FolderRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;


class FolderController extends AbstractController
{
    /**
     * @Route("/travels/{id}/folders/", name="folder_index", methods={"GET"})
     */
    public function index(Travel $travel, FolderRepository $folderRepository): Response
    {
        $folder = $folderRepository->findBy(
            ['travel' => $travel->getId()]
        );
       
        return $this->render('backend/folder/index.html.twig', ['folders' => $folder, 'travel' => $travel]);

    }

    /**
     * @Route("/travels/{id}/folders/new", name="folder_new", methods={"GET","POST"})
     */
    public function new(Travel $travel, Request $request): Response
    {
        $folder = new Folder();
        $folder->setTravel($travel);

        $form = $this->createForm(FolderType::class, $folder);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($folder);
            $entityManager->flush();

            return $this->redirectToRoute('folder_index', ['id' => $folder->getTravel()->getId()]);
        }

        return $this->render('backend/folder/new.html.twig', [
            'folder' => $folder,
            'form' => $form->createView(),
            'travel' => $travel

        ]);
    }


     /**
     * @Route("/folders/{id}", name="folder_show", methods={"GET"})
     */
    public function show(Folder $folder): Response
    {
        
        return $this->render('backend/folder/show.html.twig', ['folder' => $folder, 'travel' => $folder->getTravel(), 'documents' => $folder->getDocuments()]);

    }
    /**
     * @Route("/folders/{id}/edit", name="folder_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, Folder $folder): Response
    {
        $form = $this->createForm(FolderType::class, $folder);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('folder_index', ['id' => $folder->getTravel()->getId()]);

        }

        return $this->render('backend/folder/edit.html.twig', [
            'folder' => $folder,
            'form' => $form->createView(),
            'travel' => $folder->getTravel()
        ]);
    }

    /**
     * @Route("/folders/{id}", name="folder_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Folder $folder): Response
    {
        if ($this->isCsrfTokenValid('delete'.$folder->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($folder);
            $entityManager->flush();
        }

        return $this->redirectToRoute('folder_index', ['id' => $folder->getTravel()->getId()]);

    }
}
