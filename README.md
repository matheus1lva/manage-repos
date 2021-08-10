# Manage github repos
## install
> npx manage-repos

or 

> yarn add -D manage-repos

## usage
```sh
ACCESS_CODE=MY_GITHUB_ACCESS_CODE npx manage-repos
```

and you will be prompted the actions for it

## how to generate access code
https://github.com/settings/tokens 

Create a token with the following permissions:
1. repo
2. user > read:user
3. delete_repo