
namespace server
{
    public class class1
    {
          static int []arr = {1, 2, 3, 4, 5,6,7,8,9,10};
    static int findSum(int []A, int N)
    {
        if (N <= 0)
            return 0;
        return (findSum(A, N - 1) + A[N - 1]);
    }
 
    public static void Main()
    {
        Console.Write(findSum(arr, arr.Length));
    }
    }
}