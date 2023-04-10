Feature: Moj profil

  Scenario: Prikazuje se greska za los telefon
    When Unesem string u polje telefona
    When Kliknem na promeni
    Then Treba da se prikaze greska

  Scenario: Menja se broj telefona
    When Unesem broj telefona
    When Kliknem na promeni
    Then Treba da se prikaze popup i da se promeni broj

  Scenario: Prikazuje gresku za prazno ime
    When Ostavim polje za ime prazno
    When Kliknem na promeni
    Then Treba da se prikaze greska

  Scenario: Nedozvoljeni inputi su zakljucani
    Then Nedozvoljena polja ne mogu da se kliknu

  Scenario: Izmena svih dostupnih polja
    When Unesem ispravno ime
    When Unesem ispravno prezime
    When Unesem ispravan telefon
    When Kliknem na promeni
    Then Treba da se prikaze popup i promene vrednosti

