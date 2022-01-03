# Install dependencies
```bash
npm install
```

# Start Application
```bash
npm start
```

# Get JWT token

```curl
curl --location --request POST 'http://localhost:4000/users/authenticate' \
--header 'Content-Type: application/json' \
--data-raw '{
	"username":"globalManager",
	"password":"globalManager"
}'
```

# Get all users 

> Note: Please update the token in the header.
```curl
curl --location --request GET 'http://localhost:4000/users/' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOlt7InJvbGUiOiJHbG9iYWxNYW5hZ2VyIiwiZ3JvdXBJZCI6bnVsbH1dLCJpYXQiOjE2NDExODk0NDMsImV4cCI6MTY0MTE5NjY0M30.b4OUMpKvAc5goFlgps5kR3redj_YHgBoE5pkZwEp9mc'
```

# Get single User
```curl
curl --location --request GET 'http://localhost:4000/users/1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOlt7InJvbGUiOiJHbG9iYWxNYW5hZ2VyIiwiZ3JvdXBJZCI6bnVsbH1dLCJpYXQiOjE2NDExODk0NDMsImV4cCI6MTY0MTE5NjY0M30.b4OUMpKvAc5goFlgps5kR3redj_YHgBoE5pkZwEp9mc'
```

# Create new User
```curl
curl --location --request POST 'http://localhost:4000/users/create' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOlt7InJvbGUiOiJHbG9iYWxNYW5hZ2VyIiwiZ3JvdXBJZCI6bnVsbH1dLCJpYXQiOjE2NDExODk0NDMsImV4cCI6MTY0MTE5NjY0M30.b4OUMpKvAc5goFlgps5kR3redj_YHgBoE5pkZwEp9mc' \
--header 'Content-Type: application/json' \
--data-raw '{  "username": "Shirish", "password": "shirish","email":"shirish@g.com", "role": [{
                "role": "Manager",
                "groupId": "Group1"
            }]}'
```

# Delete User
```curl
curl --location --request DELETE 'http://localhost:4000/users/' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOlt7InJvbGUiOiJHbG9iYWxNYW5hZ2VyIiwiZ3JvdXBJZCI6bnVsbH1dLCJpYXQiOjE2NDExODk0NDMsImV4cCI6MTY0MTE5NjY0M30.b4OUMpKvAc5goFlgps5kR3redj_YHgBoE5pkZwEp9mc' \
--header 'Content-Type: application/json' \
--data-raw '{  "username": "Shirish", "password": "shirish","email":"shirish@g.com", "role": [{
                "role": "Manager",
                "groupId": "Group1"
            }]}'
```