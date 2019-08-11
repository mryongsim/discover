package com.sim;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class SaySomethingTest {

	@Test
	public void sayHiToJohn()
	{
		SaySomething say = new SaySomething();
		
		String hi = say.hello("John");
		
		assertEquals("Hello John!", hi);
	}
}
