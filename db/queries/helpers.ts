import { ProtectResult } from "@/db/types";
import { z } from "zod";
import { ExpoDbType, SQLJsDbType } from "@/db/dirzzle";

/*
* type ProtectResult<T> = { ... }

제네릭 타입 T를 사용하여 data 필드의 타입을 유연하게 만듭니다.
이 타입은 쿼리 함수의 결과 또는 에러 메시지를 포함할 수 있습니다.


export function protect<TResult, TParams extends any[]>( ... )

TResult: 쿼리 함수의 반환 타입을 나타내는 제네릭 파라미터입니다.
TParams extends any[]: 쿼리 함수의 매개변수 타입을 나타내는 제네릭 파라미터입니다. any[]를 확장하여 어떤 타입의 배열도 허용합니다.


queryFn: (db: DbType | null, ...args: TParams) => Promise<TResult>

쿼리 함수의 타입을 정의합니다. 데이터베이스 객체와 가변 인자를 받아 Promise<TResult>를 반환하는 함수여야 합니다.


paramSchema?: z.ZodType<TParams>

선택적 매개변수로, Zod 스키마를 받아 입력 매개변수를 검증합니다.


return async (db: DbType | null, ...args: TParams): Promise<ProtectResult<TResult>> => { ... }

protect 함수는 새로운 비동기 함수를 반환합니다.
이 함수는 원래의 쿼리 함수와 동일한 매개변수를 받지만, ProtectResult<TResult> 타입으로 감싸진 결과를 반환합니다.


if (db === null) { ... }

데이터베이스 연결이 없는 경우를 먼저 처리합니다.


if (paramSchema) { paramSchema.parse(args); }

Zod 스키마가 제공된 경우, 입력 매개변수를 검증합니다.


const result = await queryFn(db, ...args);

실제 쿼리 함수를 호출하고 결과를 기다립니다.


return { data: result, error: null };

성공 시 결과를 data 필드에 담아 반환합니다.


catch (error) { ... }

오류 처리 로직입니다. Zod 오류와 기타 오류를 구분하여 처리합니다.


export const getUserByEmail = async (db: DbType | null, email: string): Promise<User | undefined> => { ... }

실제 데이터베이스 쿼리 함수입니다. User | undefined를 반환합니다.


export const testGetUser = protect<User | undefined, [string]>( ... )

protect 함수를 사용하여 getUserByEmail을 감쌉니다.
<User | undefined, [string]>는 명시적 타입 인자입니다:

User | undefined는 TResult에 해당하며, getUserByEmail의 반환 타입입니다.
[string]은 TParams에 해당하며, email 매개변수의 타입을 나타냅니다.




z.tuple([z.string()])

Zod 스키마로, 단일 문자열 인자를 검증합니다.



이 구조가 제대로 작동하는 이유는 다음과 같습니다:

제네릭 타입을 사용하여 타입 정보를 보존합니다.
함수의 시그니처를 정확히 정의하여 TypeScript가 타입을 추론할 수 있게 합니다.
protect 함수 사용 시 명시적 타입 인자를 제공하여 모호성을 제거합니다.*/
export function protect<TResult, TParams extends any[]>(
  queryFn: (db: ExpoDbType | SQLJsDbType, ...args: TParams) => Promise<TResult>,
  paramSchema?: z.ZodType<TParams>
) {
  return async (
    db: ExpoDbType | SQLJsDbType | null,
    ...args: TParams
  ): Promise<ProtectResult<TResult>> => {
    if (db === null) {
      return { data: null, error: "Database connection is not available" };
    }

    try {
      if (paramSchema) {
        paramSchema.parse(args);
      }
      const result = await queryFn(db, ...args);
      return { data: result, error: null };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          data: null,
          error:
            "Invalid parameters: " +
            error.errors.map((e) => e.message).join(", "),
        };
      }

      return {
        data: null,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
    }
  };
}
