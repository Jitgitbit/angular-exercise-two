.md stands for markdown btw

ng new angular-exercise-two

npm install --save bootstrap@3

ng serve

ng g c header
ng g c recipes --skipTests true
ng g c recipes/recipe-list --skipTests true
ng g c recipes/recipe-detail --skipTests true
ng g c recipes/recipe-list/recipe-item --skipTests true
ng g c shopping-list --skipTests true
ng g c shopping-list/shopping-edit --skipTests true
ng g c recipes/recipe-start --skipTests true
ng g c recipes/recipe-edit --skipTests true


little bootstrap html shortcut trick:     .row>.col-xs-12     +tab

{
  "rules": {
    ".read": true,
    ".write": true
  }
}

ng build --prod

firebase login
firebase init
hosting only

dist/angular-exercise-two
y          (spa)
n           (overwrite?)

firebase deploy

https://phoenixrecipebook.web.app

npm install --save @ngrx/store
npm install --save @ngrx/effects
____________________________________________________________________
NOTE:
for making sure all is well protecting the environments folder:
add a line in .gitignore saying: environments/
git rm -r --cached src/environments
git add .
git commit -m 'Removed the now ignored directory "some-directory"'
git push origin master
_____________________________________________________________________

npm install --save-dev @ngrx/store-devtools            (---<> with this we can use our redux tool in the browser!)