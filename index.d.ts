/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type AwsArnString = string;
export type ErrorCode = string;
export type AwsCfFunction = AwsCfImport | AwsCfJoin | AwsCfGetAtt | AwsCfRef | AwsCfSub;
export type AwsArn = AwsArnString | AwsCfFunction;
export type AwsCfInstruction = string | AwsCfFunction;
export type FunctionName = string;
export type AwsAlbListenerArn = string;
export type AwsAlexaEventToken = string;
export type AwsLogGroupName = string;
export type AwsKmsArn =
  | {
      [k: string]: unknown;
    }
  | string;
export type AwsResourceCondition = string;
export type AwsResourceDependsOn = string[];
export type EcrImageUri = string;
export type AwsLambdaLayers = AwsArn[];
export type AwsLambdaMemorySize = number;
export type AwsLambdaRole = string | AwsCfSub | AwsCfImport | AwsCfGetAtt;
export type AwsLambdaRuntime =
  | "dotnetcore2.1"
  | "dotnetcore3.1"
  | "go1.x"
  | "java11"
  | "java8"
  | "java8.al2"
  | "nodejs10.x"
  | "nodejs12.x"
  | "nodejs14.x"
  | "provided"
  | "provided.al2"
  | "python2.7"
  | "python3.6"
  | "python3.7"
  | "python3.8"
  | "ruby2.5"
  | "ruby2.7";
export type AwsLambdaTimeout = number;
export type AwsLambdaTracing = ("Active" | "PassThrough") | boolean;
export type AwsLambdaVersioning = boolean;
export type AwsHttpApiPayload = "1.0" | "2.0";
export type AwsApiGatewayApiKeys = (
  | string
  | AwsApiGatewayApiKeysProperties
  | {
      [k: string]: (string | AwsApiGatewayApiKeysProperties)[];
    }
)[];
export type AwsResourcePolicyStatements = ({
  [k: string]: unknown;
} & (
  | {
      [k: string]: unknown;
    }
  | {
      [k: string]: unknown;
    }
) &
  (
    | {
        [k: string]: unknown;
      }
    | {
        [k: string]: unknown;
      }
  ))[];
export type AwsS3BucketName = string;
export type AwsIamPolicyStatements = ({
  [k: string]: unknown;
} & (
  | {
      [k: string]: unknown;
    }
  | {
      [k: string]: unknown;
    }
) &
  (
    | {
        [k: string]: unknown;
      }
    | {
        [k: string]: unknown;
      }
  ))[];
export type AwsCfArrayInstruction = AwsCfInstruction[] | AwsCfSplit;
export type ServiceName = string;

export interface AWS {
  configValidationMode?: "error" | "warn" | "off";
  custom?: {
    enterprise?: {
      collectApiGatewayLogs?: boolean;
      collectLambdaLogs?: boolean;
      compressLogs?: boolean;
      disableAwsSpans?: boolean;
      disableFrameworkInstrumentation?: boolean;
      disableHttpSpans?: boolean;
      logAccessIamRole?: AwsArnString;
      logIngestMode?: "push" | "pull";
    };
    [k: string]: unknown;
  };
  disabledDeprecations?: "*" | ErrorCode[];
  enableLocalInstallationFallback?: boolean;
  frameworkVersion?: string;
  functions?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[a-zA-Z0-9-_]+$".
     */
    [k: string]: {
      name?: string;
      events?: (
        | {
            __schemaWorkaround__: {
              [k: string]: unknown;
            };
          }
        | {
            schedule:
              | string
              | {
                  rate: string;
                  enabled?: boolean;
                  name?: string;
                  description?: string;
                  input?:
                    | string
                    | (
                        | {
                            body: string;
                          }
                        | {
                            [k: string]: unknown;
                          }
                      );
                  inputPath?: string;
                  inputTransformer?: {
                    inputTemplate: string;
                    inputPathsMap?: {
                      [k: string]: unknown;
                    };
                  };
                };
          }
        | {
            s3:
              | string
              | {
                  bucket: string | AwsCfFunction;
                  event?: string;
                  existing?: boolean;
                  rules?: {
                    prefix?: string;
                    suffix?: string;
                  }[];
                };
          }
        | {
            http:
              | string
              | {
                  async?: boolean;
                  authorizer?:
                    | string
                    | {
                        arn?: AwsArn;
                        authorizerId?: AwsCfInstruction;
                        claims?: string[];
                        identitySource?: string;
                        identityValidationExpression?: string;
                        managedExternally?: boolean;
                        name?: string;
                        resultTtlInSeconds?: number;
                        scopes?: string[];
                        type?: string | string | string | string;
                      };
                  connectionId?: string;
                  connectionType?: string | string;
                  cors?:
                    | boolean
                    | (
                        | {
                            [k: string]: unknown;
                          }
                        | {
                            [k: string]: unknown;
                          }
                      );
                  integration?: string | string | string | string | string | string | string | string | string | string;
                  method: string;
                  operationId?: string;
                  path: string;
                  private?: boolean;
                  request?: {
                    contentHandling?: "CONVERT_TO_BINARY" | "CONVERT_TO_TEXT";
                    method?: string;
                    parameters?: {
                      querystrings?: {
                        [k: string]:
                          | boolean
                          | {
                              required?: boolean;
                              mappedValue?: string;
                            };
                      };
                      headers?: {
                        [k: string]:
                          | boolean
                          | {
                              required?: boolean;
                              mappedValue?: string;
                            };
                      };
                      paths?: {
                        [k: string]:
                          | boolean
                          | {
                              required?: boolean;
                              mappedValue?: string;
                            };
                      };
                    };
                    passThrough?: "NEVER" | "WHEN_NO_MATCH" | "WHEN_NO_TEMPLATES";
                    schema?: {
                      [k: string]:
                        | {
                            [k: string]: unknown;
                          }
                        | string;
                    };
                    schemas?: {
                      [k: string]:
                        | {
                            [k: string]: unknown;
                          }
                        | string;
                    };
                    template?: {
                      [k: string]: string;
                    };
                    uri?: string;
                  };
                  response?: {
                    contentHandling?: "CONVERT_TO_BINARY" | "CONVERT_TO_TEXT";
                    headers?: {
                      [k: string]: string;
                    };
                    template?: string;
                    statusCodes?: {
                      [k: string]: {
                        headers?: {
                          [k: string]: string;
                        };
                        pattern?: string;
                        template?:
                          | string
                          | {
                              [k: string]: string;
                            };
                      };
                    };
                  };
                };
          }
        | {
            websocket:
              | string
              | {
                  route: string;
                  routeResponseSelectionExpression?: "$default";
                  authorizer?:
                    | AwsArnString
                    | FunctionName
                    | (
                        | {
                            [k: string]: unknown;
                          }
                        | {
                            [k: string]: unknown;
                          }
                      );
                };
          }
        | {
            sns:
              | string
              | AwsArnString
              | (
                  | {
                      [k: string]: unknown;
                    }
                  | {
                      [k: string]: unknown;
                    }
                );
          }
        | {
            stream:
              | AwsArnString
              | (
                  | {
                      arn: AwsCfFunction;
                      [k: string]: unknown;
                    }
                  | {
                      arn: AwsArnString;
                      [k: string]: unknown;
                    }
                );
          }
        | {
            kafka: {
              accessConfigurations: {
                vpcSubnet?: string[];
                vpcSecurityGroup?: string[];
                saslScram256Auth?: string[];
                saslScram512Auth?: string[];
              };
              batchSize?: number;
              enabled?: boolean;
              bootstrapServers: string[];
              startingPosition?: "LATEST" | "TRIM_HORIZON";
              topic: string;
            };
          }
        | {
            msk: {
              arn: AwsArnString | AwsCfImport | AwsCfRef;
              batchSize?: number;
              enabled?: boolean;
              startingPosition?: "LATEST" | "TRIM_HORIZON";
              topic: string;
            };
          }
        | {
            alb: {
              authorizer?: string[];
              conditions: {
                header?: {
                  name: string;
                  values: string[];
                };
                host?: string[];
                ip?: (string | string)[];
                method?: string[];
                path?: string[];
                query?: {
                  [k: string]: string;
                };
              };
              healthCheck?:
                | boolean
                | {
                    healthyThresholdCount?: number;
                    intervalSeconds?: number;
                    matcher?: {
                      httpCode?: string;
                    };
                    path?: string;
                    timeoutSeconds?: number;
                    unhealthyThresholdCount?: number;
                  };
              listenerArn: AwsAlbListenerArn | AwsCfRef;
              multiValueHeaders?: boolean;
              priority: number;
              targetGroupName?: string;
            };
          }
        | {
            alexaSkill:
              | AwsAlexaEventToken
              | {
                  appId: AwsAlexaEventToken;
                  enabled?: boolean;
                };
          }
        | {
            alexaSmartHome:
              | AwsAlexaEventToken
              | {
                  appId: AwsAlexaEventToken;
                  enabled?: boolean;
                };
          }
        | {
            iot: {
              sql: string;
              sqlVersion?: "2015-10-08" | "2016-03-23" | "beta";
              name?: string;
              enabled?: boolean;
              description?: string;
            };
          }
        | {
            iotFleetProvisioning: {
              enabled?: boolean;
              provisioningRoleArn: AwsArn;
              templateBody: {
                [k: string]: unknown;
              };
              templateName?: string;
            };
          }
        | {
            cloudwatchEvent: {
              event?: {
                [k: string]: unknown;
              };
              input?:
                | string
                | {
                    [k: string]: unknown;
                  };
              inputPath?: string;
              inputTransformer?: {
                inputPathsMap?: {
                  [k: string]: string;
                };
                inputTemplate: string;
              };
              description?: string;
              name?: string;
              enabled?: boolean;
            };
          }
        | {
            cloudwatchLog:
              | AwsLogGroupName
              | {
                  logGroup: AwsLogGroupName;
                  filter?: string;
                };
          }
        | {
            cognitoUserPool: {
              pool: string;
              trigger:
                | "PreSignUp"
                | "PostConfirmation"
                | "PreAuthentication"
                | "PostAuthentication"
                | "PreTokenGeneration"
                | "CustomMessage"
                | "DefineAuthChallenge"
                | "CreateAuthChallenge"
                | "VerifyAuthChallengeResponse"
                | "UserMigration";
              existing?: boolean;
            };
          }
        | {
            eventBridge:
              | {
                  [k: string]: unknown;
                }
              | {
                  [k: string]: unknown;
                };
          }
        | {
            sqs:
              | AwsArn
              | {
                  arn: AwsArn;
                  batchSize?: number;
                  enabled?: boolean;
                  maximumBatchingWindow?: number;
                };
          }
        | {
            cloudFront: {
              behavior?: {
                AllowedMethods?:
                  | ("GET" | "HEAD")[]
                  | ("GET" | "HEAD" | "OPTIONS")[]
                  | ("GET" | "HEAD" | "OPTIONS" | "PUT" | "PATCH" | "POST" | "DELETE")[];
                CachedMethods?: ("GET" | "HEAD")[] | ("GET" | "HEAD" | "OPTIONS")[];
                ForwardedValues?: {
                  Cookies?:
                    | {
                        Forward: "all" | "none";
                      }
                    | {
                        Forward: "whitelist";
                        WhitelistedNames: string[];
                      };
                  Headers?: string[];
                  QueryString: boolean;
                  QueryStringCacheKeys?: string[];
                };
                CachePolicyId?: string;
                Compress?: boolean;
                FieldLevelEncryptionId?: string;
                OriginRequestPolicyId?: string;
                SmoothStreaming?: boolean;
                TrustedSigners?: string[];
                ViewerProtocolPolicy?: "allow-all" | "redirect-to-https" | "https-only";
              };
              cachePolicy?:
                | {
                    [k: string]: unknown;
                  }
                | {
                    [k: string]: unknown;
                  };
              eventType?: "viewer-request" | "origin-request" | "origin-response" | "viewer-response";
              isDefaultOrigin?: boolean;
              includeBody?: boolean;
              origin?:
                | string
                | (
                    | {
                        [k: string]: unknown;
                      }
                    | {
                        [k: string]: unknown;
                      }
                  );
              pathPattern?: string;
            };
          }
        | {
            httpApi:
              | string
              | {
                  authorizer?:
                    | string
                    | (
                        | {
                            [k: string]: unknown;
                          }
                        | {
                            [k: string]: unknown;
                          }
                        | {
                            [k: string]: unknown;
                          }
                      );
                  method?: string;
                  path: string;
                };
          }
      )[];
      awsKmsKeyArn?: AwsKmsArn;
      condition?: AwsResourceCondition;
      dependsOn?: AwsResourceDependsOn;
      description?: string;
      destinations?: {
        onSuccess?: string;
        onFailure?: string;
      };
      disableLogs?: boolean;
      environment?: AwsLambdaEnvironment;
      fileSystemConfig?: {
        arn: string | AwsCfGetAtt | AwsCfJoin | AwsCfImport;
        localMountPath: string;
      };
      handler?: string;
      image?:
        | EcrImageUri
        | {
            name?: string;
            uri?: EcrImageUri;
            workingDirectory?: string;
            command?: string[];
            entryPoint?: string[];
          };
      kmsKeyArn?: AwsKmsArn;
      layers?: AwsLambdaLayers;
      maximumEventAge?: number;
      maximumRetryAttempts?: number;
      memorySize?: AwsLambdaMemorySize;
      onError?: string | AwsCfFunction;
      package?: {
        artifact?: string;
        exclude?: string[];
        include?: string[];
        individually?: boolean;
        patterns?: string[];
      };
      provisionedConcurrency?: number;
      reservedConcurrency?: number;
      role?: AwsLambdaRole;
      runtime?: AwsLambdaRuntime;
      tags?: AwsResourceTags;
      timeout?: AwsLambdaTimeout;
      tracing?: AwsLambdaTracing;
      versionFunction?: AwsLambdaVersioning;
      vpc?: AwsLambdaVpcConfig;
      httpApi?: {
        payload?: AwsHttpApiPayload;
      };
    };
  };
  package?: {
    artifact?: string;
    exclude?: string[];
    excludeDevDependencies?: boolean;
    include?: string[];
    individually?: boolean;
    path?: string;
    patterns?: string[];
  };
  plugins?:
    | {
        localPath?: string;
        modules: string[];
      }
    | string[];
  projectDir?: string;
  provider: {
    name: "aws";
    apiGateway?: {
      apiKeys?: AwsApiGatewayApiKeys;
      apiKeySourceType?: string;
      binaryMediaTypes?: string[];
      description?: string;
      disableDefaultEndpoint?: boolean;
      metrics?: boolean;
      minimumCompressionSize?: number;
      resourcePolicy?: AwsResourcePolicyStatements;
      restApiId?: AwsCfInstruction;
      restApiResources?:
        | {
            path?: string;
            resourceId?: string;
          }[]
        | {
            [k: string]: unknown;
          };
      restApiRootResourceId?: AwsCfInstruction;
      request?: {
        schemas?: {
          [k: string]: {
            schema: {
              [k: string]: unknown;
            };
            name?: string;
            description?: string;
          };
        };
      };
      shouldStartNameWithService?: true;
      usagePlan?:
        | {
            quota?: {
              limit?: number;
              offset?: number;
              period?: "DAY" | "WEEK" | "MONTH";
            };
            throttle?: {
              burstLimit?: number;
              rateLimit?: number;
            };
          }
        | {
            [k: string]: {
              quota?: {
                limit?: number;
                offset?: number;
                period?: "DAY" | "WEEK" | "MONTH";
              };
              throttle?: {
                burstLimit?: number;
                rateLimit?: number;
              };
            };
          }[];
      websocketApiId?: AwsCfInstruction;
    };
    apiKeys?: AwsApiGatewayApiKeys;
    apiName?: string;
    alb?: {
      targetGroupPrefix?: string;
      authorizers?: {
        [k: string]:
          | {
              type: "oidc";
              authorizationEndpoint: {
                [k: string]: unknown;
              };
              clientId: string;
              clientSecret?: string;
              issuer: {
                [k: string]: unknown;
              };
              tokenEndpoint: {
                [k: string]: unknown;
              };
              userInfoEndpoint: {
                [k: string]: unknown;
              };
              onUnauthenticatedRequest?: "allow" | "authenticate" | "deny";
              requestExtraParams?: {
                [k: string]: string;
              };
              scope?: string;
              sessionCookieName?: string;
              sessionTimeout?: number;
            }
          | {
              type: "cognito";
              userPoolArn: AwsArn;
              userPoolClientId: string;
              userPoolDomain: string;
              onUnauthenticatedRequest?: "allow" | "authenticate" | "deny";
              requestExtraParams?: {
                [k: string]: string;
              };
              scope?: string;
              sessionCookieName?: string;
              sessionTimeout?: number;
            };
      };
    };
    cfnRole?: AwsArn;
    cloudFront?: {
      cachePolicies?: {
        [k: string]: {
          Comment?: string;
          DefaultTTL: number;
          MaxTTL: number;
          MinTTL: number;
          ParametersInCacheKeyAndForwardedToOrigin: {
            CookiesConfig?: {
              CookieBehavior: "none" | "whitelist" | "allExcept" | "all";
              Cookies?: string[];
            };
            EnableAcceptEncodingBrotli?: boolean;
            EnableAcceptEncodingGzip?: boolean;
            HeadersConfig?: {
              HeaderBehavior: "none" | "whitelist";
              Headers?: string[];
            };
            QueryStringsConfig?: {
              QueryStringBehavior: "none" | "whitelist" | "allExcept" | "all";
              QueryStrings?: string[];
            };
          };
        };
      };
    };
    deploymentBucket?:
      | AwsS3BucketName
      | {
          blockPublicAccess?: boolean;
          skipPolicySetup?: boolean;
          maxPreviousDeploymentArtifacts?: number;
          name?: AwsS3BucketName;
          serverSideEncryption?: "AES256" | "aws:kms";
          sseCustomerAlgorithim?: string;
          sseCustomerKey?: string;
          sseCustomerKeyMD5?: string;
          sseKMSKeyId?: string;
          tags?: AwsResourceTags;
        };
    deploymentPrefix?: string;
    endpointType?: string;
    environment?: AwsLambdaEnvironment;
    eventBridge?: {
      useCloudFormation?: true;
    };
    httpApi?: {
      authorizers?: {
        [k: string]:
          | {
              type?: "jwt";
              name?: string;
              identitySource: AwsCfInstruction;
              issuerUrl: AwsCfInstruction;
              audience: AwsCfInstruction | AwsCfInstruction[];
            }
          | {
              type: "request";
              name?: string;
              functionName?: string;
              functionArn?: AwsCfInstruction;
              managedExternally?: boolean;
              resultTtlInSeconds?: number;
              enableSimpleResponses?: boolean;
              payloadVersion?: AwsHttpApiPayload;
              identitySource?: AwsCfInstruction | AwsCfInstruction[];
              [k: string]: unknown;
            };
      };
      cors?:
        | boolean
        | {
            allowCredentials?: boolean;
            allowedHeaders?: string[];
            allowedMethods?: string[];
            allowedOrigins?: string[];
            exposedResponseHeaders?: string[];
            maxAge?: number;
          };
      id?: string | AwsCfImportLocallyResolvable;
      name?: string;
      payload?: string;
      metrics?: boolean;
      useProviderTags?: true;
      disableDefaultEndpoint?: boolean;
    };
    iam?: {
      role?:
        | AwsLambdaRole
        | {
            name?: string;
            path?: string;
            managedPolicies?: AwsArn[];
            statements?: AwsIamPolicyStatements;
            permissionBoundary?: AwsArn;
            permissionsBoundary?: AwsArn;
            tags?: AwsResourceTags;
          };
      deploymentRole?: AwsArn;
    };
    iamManagedPolicies?: AwsArn[];
    iamRoleStatements?: AwsIamPolicyStatements;
    ecr?: {
      scanOnPush?: boolean;
      images: {
        /**
         * This interface was referenced by `undefined`'s JSON-Schema definition
         * via the `patternProperty` "^[a-z][a-z0-9-_]{1,31}$".
         */
        [k: string]:
          | {
              uri?: EcrImageUri;
              path?: string;
              file?: string;
              buildArgs?: {
                [k: string]: string;
              };
              cacheFrom?: unknown[];
            }
          | string;
      };
    };
    kmsKeyArn?: AwsKmsArn;
    lambdaHashingVersion?: "20201221";
    layers?: AwsLambdaLayers;
    logRetentionInDays?: 1 | 3 | 5 | 7 | 14 | 30 | 60 | 90 | 120 | 150 | 180 | 365 | 400 | 545 | 731 | 1827 | 3653;
    logs?: {
      frameworkLambda?: boolean;
      httpApi?:
        | boolean
        | {
            format?: string;
          };
      restApi?:
        | boolean
        | {
            accessLogging?: boolean;
            executionLogging?: boolean;
            format?: string;
            fullExecutionData?: boolean;
            level?: "INFO" | "ERROR";
            role?: AwsArn;
            roleManagedExternally?: boolean;
          };
      websocket?:
        | boolean
        | {
            level?: "INFO" | "ERROR";
          };
      [k: string]: unknown;
    };
    memorySize?: AwsLambdaMemorySize;
    notificationArns?: AwsArnString[];
    profile?: string;
    region?:
      | "us-east-1"
      | "us-east-2"
      | "us-gov-east-1"
      | "us-gov-west-1"
      | "us-west-1"
      | "us-west-2"
      | "af-south-1"
      | "ap-east-1"
      | "ap-northeast-1"
      | "ap-northeast-2"
      | "ap-northeast-3"
      | "ap-south-1"
      | "ap-southeast-1"
      | "ap-southeast-2"
      | "ca-central-1"
      | "cn-north-1"
      | "cn-northwest-1"
      | "eu-central-1"
      | "eu-north-1"
      | "eu-south-1"
      | "eu-west-1"
      | "eu-west-2"
      | "eu-west-3"
      | "me-south-1"
      | "sa-east-1";
    resourcePolicy?: AwsResourcePolicyStatements;
    role?: AwsLambdaRole;
    rolePermissionsBoundary?: AwsArnString;
    rollbackConfiguration?: {
      RollbackTriggers?: {
        Arn: AwsArnString;
        Type: "AWS::CloudWatch::Alarm";
      }[];
      MonitoringTimeInMinutes?: number;
    };
    runtime?: AwsLambdaRuntime;
    s3?: {
      [k: string]: {
        accelerateConfiguration?: {
          AccelerationStatus: "Enabled" | "Suspended";
        };
        accessControl?: string;
        analyticsConfigurations?: {
          Id: string;
          Prefix?: string;
          StorageClassAnalysis: {
            DataExport?: {
              Destination: {
                BucketAccountId?: string;
                BucketArn: AwsArn;
                Format: "CSV" | "ORC" | "Parquet";
                Prefix?: string;
              };
              OutputSchemaVersion: "V_1";
            };
          };
          TagFilters?: {
            Key: string;
            Value: string;
          }[];
        }[];
        bucketEncryption?: {
          ServerSideEncryptionConfiguration: {
            ServerSideEncryptionByDefault?: {
              KMSMasterKeyID?: AwsArn | string;
              SSEAlgorithm: "AES256" | "aws:kms";
            };
          }[];
        };
        bucketName?: AwsS3BucketName;
        corsConfiguration?: {
          CorsRules: {
            AllowedHeaders?: string[];
            AllowedMethods: ("GET" | "PUT" | "HEAD" | "POST" | "DELETE")[];
            AllowedOrigins: string[];
            ExposedHeaders?: string[];
            Id?: string;
            MaxAge?: number;
          }[];
        };
        inventoryConfigurations?: {
          Destination: {
            BucketAccountId?: string;
            BucketArn: AwsArn;
            Format: "CSV" | "ORC" | "Parquet";
            Prefix?: string;
          };
          Enabled: boolean;
          Id: string;
          IncludedObjectVersions: "All" | "Current";
          OptionalFields?: string[];
          Prefix?: string;
          ScheduleFrequency: "Daily" | "Weekly";
        }[];
        lifecycleConfiguration?: {
          Rules: (
            | {
                [k: string]: unknown;
              }
            | {
                [k: string]: unknown;
              }
            | {
                [k: string]: unknown;
              }
            | {
                [k: string]: unknown;
              }
            | {
                [k: string]: unknown;
              }
            | {
                [k: string]: unknown;
              }
            | {
                [k: string]: unknown;
              }
            | {
                [k: string]: unknown;
              }
          )[];
        };
        loggingConfiguration?: {
          DestinationBucketName?: AwsS3BucketName | AwsCfFunction;
          LogFilePrefix?: string;
        };
        metricsConfigurations?: {
          Id: string;
          Prefix?: string;
          TagFilters?: {
            Key: string;
            Value: string;
          }[];
        }[];
        name?: AwsS3BucketName;
        notificationConfiguration?: {
          LambdaConfigurations?: {
            Event: string;
            Filter?: {
              S3Key: {
                Rules: {
                  Name: "prefix" | "suffix";
                  Value: string;
                }[];
              };
            };
            Function: AwsArn;
          }[];
          QueueConfigurations?: {
            Event: string;
            Filter?: {
              S3Key: {
                Rules: {
                  Name: "prefix" | "suffix";
                  Value: string;
                }[];
              };
            };
            Queue: AwsArn;
          }[];
          TopicConfigurations?: {
            Event: string;
            Filter?: {
              S3Key: {
                Rules: {
                  Name: "prefix" | "suffix";
                  Value: string;
                }[];
              };
            };
            Topic: AwsArn;
          }[];
        };
        objectLockConfiguration?: {
          ObjectLockEnabled?: "Enabled";
          Rule?: {
            DefaultRetention?: {
              Days?: number;
              Mode?: "COMPLIANCE" | "GOVERNANCE";
              Years?: number;
            };
          };
        };
        objectLockEnabled?: boolean;
        publicAccessBlockConfiguration?: {
          BlockPublicAcls?: boolean;
          BlockPublicPolicy?: boolean;
          IgnorePublicAcls?: boolean;
          RestrictPublicBuckets?: boolean;
        };
        replicationConfiguration?: {
          Role: AwsArn;
          Rules: {
            DeleteMarkerReplication?: {
              Status?: "Disabled" | "Enabled";
            };
            Destination: {
              AccessControlTranslation?: {
                Owner: "Destination";
              };
              Account?: string;
              Bucket: AwsArn;
              EncryptionConfiguration?: {
                ReplicaKmsKeyID: string;
              };
              Metrics?: {
                EventThreshold: {
                  Minutes: number;
                };
                Status: "Disabled" | "Enabled";
              };
              ReplicationTime?: {
                Status: "Disabled" | "Enabled";
                Time: {
                  Minutes: number;
                };
              };
              StorageClass?:
                | "DEEP_ARCHIVE"
                | "GLACIER"
                | "INTELLIGENT_TIERING"
                | "ONEZONE_IA"
                | "OUTPOSTS"
                | "REDUCED_REDUNDANCY"
                | "STANDARD"
                | "STANDARD_IA";
            };
            Filter?: {
              And?: {
                Prefix?: string;
                TagFilters?: {
                  Key: string;
                  Value: string;
                }[];
              };
              Prefix?: string;
              TagFilter?: {
                Key: string;
                Value: string;
              };
            };
            Id?: string;
            Prefix?: string;
            Priority?: number;
            SourceSelectionCriteria?: {
              SseKmsEncryptedObjects: {
                Status: "Disabled" | "Enabled";
              };
            };
            Status: "Disabled" | "Enabled";
          }[];
        };
        tags?: {
          Key: string;
          Value: string;
        }[];
        versioningConfiguration?: {
          Status: "Enabled" | "Suspended";
        };
        websiteConfiguration?: {
          ErrorDocument?: string;
          IndexDocument?: string;
          RedirectAllRequestsTo?: {
            HostName: string;
            Protocol?: "http" | "https";
          };
          RoutingRules?: {
            RedirectRule: {
              HostName?: string;
              HttpRedirectCode?: string;
              Protocol?: "http" | "https";
              ReplaceKeyPrefixWith?: string;
              ReplaceKeyWith?: string;
            };
            RoutingRuleCondition?: {
              HttpErrorCodeReturnedEquals?: string;
              KeyPrefixEquals?: string;
            };
          }[];
        };
      };
    };
    stage?: string;
    stackName?: string;
    stackParameters?: {
      ParameterKey?: string;
      ParameterValue?: string;
      UsePreviousValue?: boolean;
      ResolvedValue?: string;
    }[];
    stackPolicy?: AwsIamPolicyStatements;
    stackTags?: AwsResourceTags;
    tags?: AwsResourceTags;
    timeout?: AwsLambdaTimeout;
    tracing?: {
      apiGateway?: boolean;
      lambda?: AwsLambdaTracing;
    };
    usagePlan?:
      | {
          quota?: {
            limit?: number;
            offset?: number;
            period?: "DAY" | "WEEK" | "MONTH";
          };
          throttle?: {
            burstLimit?: number;
            rateLimit?: number;
          };
        }
      | {
          [k: string]: {
            quota?: {
              limit?: number;
              offset?: number;
              period?: "DAY" | "WEEK" | "MONTH";
            };
            throttle?: {
              burstLimit?: number;
              rateLimit?: number;
            };
          };
        }[];
    vpc?: AwsLambdaVpcConfig;
    vpcEndpointIds?: AwsCfArrayInstruction;
    versionFunctions?: AwsLambdaVersioning;
    websocketsApiName?: string;
    websocketsApiRouteSelectionExpression?: string;
  };
  service:
    | ServiceName
    | {
        name: ServiceName;
        awsKmsKeyArn?: AwsKmsArn;
      };
  unresolvedVariablesNotificationMode?: "error" | "warn";
  useDotenv?: true;
  variablesResolutionMode?: "20210219" | "20210326";
  resources?: {
    AWSTemplateFormatVersion?: string;
    Conditions?: {
      [k: string]: unknown;
    };
    Description?: string;
    Mappings?: {
      [k: string]: unknown;
    };
    Metadata?: {
      [k: string]: unknown;
    };
    Outputs?: {
      [k: string]: unknown;
    };
    Parameters?: {
      [k: string]: unknown;
    };
    Resources?: {
      "Fn::Transform"?: {
        Name: string;
        Parameters?: {
          [k: string]: unknown;
        };
      };
      /**
       * This interface was referenced by `undefined`'s JSON-Schema definition
       * via the `patternProperty` "^[a-zA-Z0-9]{1,255}$".
       */
      [k: string]: {
        Type: string;
        Properties?: {
          [k: string]: unknown;
        };
        CreationPolicy?: {
          [k: string]: unknown;
        };
        DeletionPolicy?: string;
        DependsOn?: AwsResourceDependsOn;
        Metadata?: {
          [k: string]: unknown;
        };
        UpdatePolicy?: {
          [k: string]: unknown;
        };
        UpdateReplacePolicy?: string;
        Condition?: AwsResourceCondition;
      };
    };
    Transform?: string[];
    extensions?: {
      /**
       * This interface was referenced by `undefined`'s JSON-Schema definition
       * via the `patternProperty` "^[a-zA-Z0-9]{1,255}$".
       */
      [k: string]: {
        Properties?: {
          [k: string]: unknown;
        };
        CreationPolicy?: {
          [k: string]: unknown;
        };
        DeletionPolicy?: string;
        DependsOn?: AwsResourceDependsOn;
        Metadata?: {
          [k: string]: unknown;
        };
        UpdatePolicy?: {
          [k: string]: unknown;
        };
        UpdateReplacePolicy?: string;
        Condition?: AwsResourceCondition;
      };
    };
  };
  layers?: {
    [k: string]: {
      allowedAccounts?: string[];
      compatibleRuntimes?: AwsLambdaRuntime[];
      description?: string;
      licenseInfo?: string;
      name?: string;
      package?: {
        artifact?: string;
        exclude?: string[];
        include?: string[];
        patterns?: string[];
      };
      path?: string;
      retain?: boolean;
    };
  };
  org?: string;
  app?: string;
  outputs?: {
    [k: string]:
      | string
      | number
      | boolean
      | unknown[]
      | {
          [k: string]: unknown;
        };
  };
}
export interface AwsCfImport {
  "Fn::ImportValue": unknown;
}
export interface AwsCfJoin {
  "Fn::Join": [string, unknown[]];
}
export interface AwsCfGetAtt {
  "Fn::GetAtt": string[];
}
export interface AwsCfRef {
  Ref: string;
}
export interface AwsCfSub {
  "Fn::Sub": unknown;
}
export interface AwsLambdaEnvironment {
  /**
   * This interface was referenced by `AwsLambdaEnvironment`'s JSON-Schema definition
   * via the `patternProperty` "^[A-Za-z_][a-zA-Z0-9_]*$".
   */
  [k: string]:
    | {
        [k: string]: unknown;
      }
    | AwsCfInstruction;
}
export interface AwsResourceTags {
  /**
   * This interface was referenced by `AwsResourceTags`'s JSON-Schema definition
   * via the `patternProperty` "^(?!aws:)[\w./=+:\-_\x20]{1,128}$".
   */
  [k: string]: string;
}
export interface AwsLambdaVpcConfig {
  securityGroupIds: AwsCfInstruction[] | AwsCfSplit;
  subnetIds: AwsCfInstruction[] | AwsCfSplit;
}
export interface AwsCfSplit {
  "Fn::Split": (string | AwsCfFunction)[];
}
export interface AwsApiGatewayApiKeysProperties {
  name?: string;
  value?: string;
  description?: string;
  customerId?: string;
}
export interface AwsCfImportLocallyResolvable {
  "Fn::ImportValue": string;
}
