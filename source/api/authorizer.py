import requests
from requests import Response

def handler(event, context):
    authorization_token = event['headers'].get('Authorization', '')
    oidc_issue_token = event['headers'].get('OIDC-Issue', '')
    token = authorization_token.split()[1]  # Bearer token
    validate_access_token_url = f"{oidc_issue_token}/api/v2/oidc/validate_token?access_token={token}"
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    response: Response = requests.get(validate_access_token_url, headers=headers, timeout=10*60)
    if response.json().get("aud"):
        return generate_policy('user', 'Allow', event['methodArn'])
    else:
        return generate_policy('user', 'Deny', event['methodArn'])

def generate_policy(principal_id, effect, resource):
    auth_response = {}
    auth_response['principalId'] = principal_id
    if effect and resource:
        policy_document = {
            'Version': '2012-10-17',
            'Statement': [
                {
                    'Action': 'execute-api:Invoke',
                    'Effect': effect,
                    'Resource': resource
                }
            ]
        }
        auth_response['policyDocument'] = policy_document
    return auth_response
