# monorepo-api-gateway-example
This repo shows an example of how to use AWS API Gateway in a monorepo.  Couple notes:
- nestjs supports automatically generating openapi specs.  
  - We enrich these with AWS extensions, and then upload to apigateway automatically
- Uses a simple matrix build in workflow.yml to deploy multiple services
- Roughly based off: https://www.youtube.com/watch?v=XhS2JbPg8jA
- Time: 5 hours to setup
- API Gateway link: https://us-east-2.console.aws.amazon.com/apigateway/main/apis?region=us-east-2
