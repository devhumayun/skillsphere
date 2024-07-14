UntrustedHost : To fix this error

create a variable in .evn like this => AUTH_TRUST_HOST = http://localhost:3000
enable this 2 configaration in auth.js =>  
trustHost: true,
trustHostedDomain: true,
