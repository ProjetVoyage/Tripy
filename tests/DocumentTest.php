<?php

namespace App\Tests\Util;

use PHPUnit\Framework\TestCase;
use App\Entity\Document;
use App\Entity\Folder;
use App\Entity\Traveler;

use App\Entity\Travel;

use Faker;

class DocumentTest extends TestCase
{
    public function testFolderSameDocument()
    {
        $faker = Faker\Factory::create('fr_FR');
        

        $travel = new Travel();
        $travel->setId(1);
        $travel->setName($faker->name);


        $folder = new Folder();
        $folder->setName($faker->name);
        $folder->setTravel($travel);


        $document1 = new Document();
        $document1->setName($faker->name);
        $document1->setUrl($faker->url);

        $document2 = new Document();
        $document2->setName($faker->name);
        $document2->setUrl($faker->url);


        $folder->addDocument($document1);
        $folder->addDocument( $document2);
        $folder->addDocument( $document2); //ajout de doublon



        $numberDocuments= $folder->getDocuments();

        $this->assertEquals(count($numberDocuments), 2);
    }

    public function testRemoveDocument()
    {
        $faker = Faker\Factory::create('fr_FR');
        
        $travel = new Travel();
        $travel->setId(1);
        $travel->setName($faker->name);

        $folder = new Folder();
        $folder->setName($faker->name);
        $folder->setTravel($travel);

        $travel->addFolder( $folder);

        $document1 = new Document();
        $document1->setName($faker->name);
        $document1->setUrl($faker->url);

        $document2 = new Document();
        $document2->setName($faker->name);
        $document2->setUrl($faker->url);


        $folder->addDocument($document1);
        $folder->addDocument( $document2);

        $folder->removeDocument($document1);
        $numberDocuments= $folder->getDocuments();


       
        $this->assertEquals(count($numberDocuments), 1);
    }
  
}