# AssignmentApp Driss EL AYOUBI MBDS EMSI CASA

Bonjour Mr BUFFA, voici l'application Assignment que j'ai modifiée selon les consignes que vous nous avez fournies. En l'occurrence, j'ai effectué les modifications suivantes :

## Interface Login et sécurité

J'ai implémenté un nouveau component appy-login dans lequel j'ai développé le login en mode statique dans le serveur d'authentification ( un tableau contenant les informations de 2 users ). D'ailleurs, utilisez les identifiants suivants pour vous connecter : Login : user1
                                                                                Password : user1Password
J'ai aussi ajouté deux boutons "Se connecter" et "Deconnexion" : le premier s'affiche si l'utilisateur est déconnecté et vice-versa. Ils renvoient tous les deux l'utilisateur vers le component de login via un Router.
Enfin, les différentes fonctionnalités (ajout, modification, suppression) ne sont utilisables que par un administrateur : dans notre cas, tout utilisateur connecté est admin.

## Table de hauteur fixe, sticky row, surlignage

J'ai utilisé le module MatTableModule pour créer une table Angular Material et l'utiliser pour afficher les données au lieu de la liste. Ces données sont passées via dateSource à l'initialisation.
J'ai rendu cette table de hauteur fixe ( 5 enregistrements ) en créant une nouvelle classe CSS, puis j'ai fixé le header avec le styling "sticky".
J'ai gardé la possibilité d'accéder au détail d'un assignment en appuyant sur le nom de ce dernier ( qui est un lien ).
Le nom s'affiche en bleu si l'assignment est rendu et en rouge sinon.
J'ai aussi rajouté le surlignage de l'assignment sur lequel on déplace la souris avec CSS (hover).

## Pagination

J'ai utilisé le module de pagination de Angular Material pour paginer la table, plus particulièrement l'object PageEvent. Ce dernier faisait un appel à la méthode du service qui extrait les données en fonction du numéro de page et de la taille de page. J'ai aussi ajouté un champ qui permet de modifier les options de taille de page offertes.

## Colonnes Détail et Delete, SnackBar

J'ai rajouté deux nouvelles colonnes à la table : une colonne Détail qui permet d'accéder au component de détail ( comme lorsqu'on appuyait sur le lien ), et une colonne Delete qui permet de supprimer directement l'assignment sans passer par le component de détail. Les deux colonnes sont représentées par des icônes qui sont grisées si l'utilisateur n'est pas administrateur. Appuyer sur l'icône Delete fait apparaître un Dialog Angular Material qui permet à l'utilisateur de vérifier qu'il veut vraiment supprimer l'assignment.
NB: Lorsqu'un assignment est supprimé, il apparaît toujours dans la table, il faut rafraîchir la table pour qu'il ne soit plus visible. Je n'ai malheureusement pas su rectifier ce détail.

J'ai aussi implémenté le module SnackBar, pour afficher le message de la console à l'écran de l'utilisateur lorsqu'il effectue un ajout d'assignment, une modification ou une suppression.

## Sort Header

A l'aide du module MatSortModule, j'ai implémenté une méthode qui prend en entrée l'Event de tri d'une colonne et trie le dataSource pour l'afficher selon le tri choisi. Cela se fait au niveau d'Angular et pas dans le backend.
