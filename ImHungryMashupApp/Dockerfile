############################################################
# Dockerfile to build node app
############################################################
FROM node

# Set basic AWS credentials and API Key variables
ENV AWS_ACCESS_KEY_ID XXID
ENV AWS_SECRET_ACCESS_KEY XXSECRET
ENV AWS_SESSION_TOKEN XXTOKEN
ENV MY_API_KEY_1 YYKEY1
ENV MY_API_KEY_2 YYKEY2
ENV REGION XXREGION
ENV BUCKETNAME XXBUCKETNAME
ENV KEY XXKEY

# Copy the app source
COPY . /app

# Set working directory
WORKDIR /app

# Install app dependencies
RUN npm install

# Expose the port
EXPOSE 3000

# Start the app per package.json
CMD ["npm", "start"]