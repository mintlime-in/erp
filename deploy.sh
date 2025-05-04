echo "$KUBE_CONFIG" | base64 -d > /tmp/config
export KUBECONFIG=/tmp/config

helm \
    upgrade --install ${RELEASE} \
    --set image.tag=${IMAGE_TAG} \
    --set ingress.hosts[0].host=${URL} \
    --set ingress.tls[0].hosts[0]=${URL} \
    --set ingress.tls[0].secretName=${RELEASE}-tls \
    --set ingress.hosts[0].paths[0].path="/" \
    --set ingress.hosts[0].paths[0].pathType=ImplementationSpecific \
    --set-string=env[0].name=DB_HOST \
    --set-string=env[0].value=${DB_HOST} \
    --set-string=env[1].name=DB_PORT \
    --set-string=env[1].value="${DB_PORT}" \
    --set-string=env[2].name=DB_USERNAME \
    --set-string=env[2].value=${DB_USERNAME} \
    --set-string=env[3].name=DB_PASSWORD \
    --set-string=env[3].value="${DB_PASSWORD}" \
    --set-string=env[4].name=DB_DB \
    --set-string=env[4].value="${DB_DB}" \
    --set-string=env[5].name=GOOGLE_CLIENT_ID \
    --set-string=env[5].value="${GOOGLE_CLIENT_ID}" \
    --set-string=env[6].name=GOOGLE_CLIENT_SECRET \
    --set-string=env[6].value="${GOOGLE_CLIENT_SECRET}" \
    --set-string=env[7].name=NEXTAUTH_SECRET \
    --set-string=env[7].value="${NEXTAUTH_SECRET}" \
    --set-string=env[8].name=AUTH_URL \
    --set-string=env[8].value="https://${URL}" \
    --debug \
    -n ${RELEASE} --create-namespace \
    ./helm