public class AppleAndOrange {
    static void countApplesAndOranges(int s, int t, int a, int b, int[] apples, int[] oranges) {
        int appleCount = 0;
        int orangeCount = 0;
        for (int index = 0; index != apples.length; index++) {
            int result = apples[index] + a;
            if (result <= t && result >= s) {
                appleCount++;
            }
        }
        for (int index = 0; index != oranges.length; index++) {
            int result = oranges[index] + b;
            if (result <= t && result >= s) {
                orangeCount++;
            }
        }
        System.out.println(appleCount);
        System.out.println(orangeCount);
    }
    public static void main(String[] args) {
        int [] apples = {-2, 2, 1};
        int [] oranges = {5, -6};
        countApplesAndOranges(7,11,5,15, apples, oranges);
    }
}
