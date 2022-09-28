# /bin/sh

[ -d push ] && rm -rf push
# pnpm build
mkdir push
cd push
git init -q
touch .nojekyll
cp -r ../content/.vitepress/dist docs/
git add .
git commit -m "new build by vitepress"
git remote add origin git@github.com:JingMatrix/jingmatrix.github.io.git
git push --set-upstream origin master -f
cd ..
rclone -L sync push/docs cnrs-perso:public
rm -rf push
